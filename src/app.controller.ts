import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { AppService } from './app.service';

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
  getHelloId(@Param('id', ParseIntPipe) id: number): string {
    return this.appService.getHelloId(id);
  }
}
