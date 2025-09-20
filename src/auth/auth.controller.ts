import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RefreshToken, SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() dto: RefreshToken) {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }

  @Post('/signout')
  async signout(@Body() dto: RefreshToken) {
    return this.authService.signout(dto.refreshToken);
  }
}
