import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}
