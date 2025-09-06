import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';
import { CustomParseIntPipe } from './common/Pipes/CustomParseIntPipe';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('mode')
  getMode() {
    return this.appService.getMode();
  }

  @Get(':id')
  getHelloId(@Param('id', CustomParseIntPipe) id: number): string {
    return this.appService.getHelloId(id);
  }
}
