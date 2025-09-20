import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CONF_JWT } from 'src/common/constants';
import { comparePassAndHash } from 'src/common/utils';
import { PrismaService } from 'src/prisma.service';

import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET_ACCESS;
  private readonly JWT_SECRET_REFRESH;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SECRET_ACCESS =
      this.configService.get('JWT_SECRET_ACCESS') || 'simple secret access key';

    this.JWT_SECRET_REFRESH =
      this.configService.get('JWT_SECRET_REFRESH') ||
      'simple secret refresh key';
  }

  // @UniqueError()
  // async signup(dto: CreateUserDto) {
  //   const objectToCreate = { ...dto };

  //   objectToCreate.password = await hashPassword(dto.password);

  //   return await this.prisma.user.create({ data: dto });
  // }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async tokenCleanupDB() {
    try {
      const now = new Date();
      const result = await this.prisma.refreshToken.deleteMany({
        where: { expiresAt: { lt: now } },
      });

      console.log(`Deleted ${result.count} expired tokens о ${now}`);
    } catch (error) {
      console.error('Error at cron job of deleting tokens:', error);
    }
  }

  async generateTokens(userId: number, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_ACCESS,
      expiresIn: CONF_JWT.EXPIRES_ACCESS,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.JWT_SECRET_REFRESH,
      expiresIn: CONF_JWT.EXPIRES_REFRESH,
    });

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: CONF_JWT.getFutureDateExpiresRefresh(),
      },
    });

    return { accessToken, refreshToken };
  }

  async signin(dto: SigninDto): Promise<any> {
    const { nameOrEmail, password: hypotheticalPass } = dto;

    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email: nameOrEmail }, { name: nameOrEmail }] },
    });

    const isCorrectPass = await comparePassAndHash(
      hypotheticalPass,
      user?.password,
    );

    if (!user || !isCorrectPass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.generateTokens(user.id, user.email);
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.JWT_SECRET_REFRESH,
      });

      const refreshTokenDB = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });
      if (!refreshTokenDB || !refreshTokenDB.user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = {
        sub: refreshTokenDB.user.id,
        email: refreshTokenDB.user.email,
      };

      const accessToken = this.jwtService.sign(payload, {
        secret: this.JWT_SECRET_ACCESS,
        expiresIn: CONF_JWT.EXPIRES_ACCESS,
      });

      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async signout(refreshToken: string) {
    // to avoid error
    await this.prisma.refreshToken.deleteMany({
      where: { token: refreshToken },
    });
  }
}
