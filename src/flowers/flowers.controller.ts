import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, AuthGuardLevels } from 'src/common/Guards/AuthGuard';
import { FlowersService } from './flowers.service';

import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';

const { USER, ADMIN } = AuthGuardLevels;

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @UseGuards(AuthGuard(ADMIN))
  create(@Body() dto: CreateFlowerDto) {
    return this.flowersService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard(USER))
  findAll() {
    return this.flowersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard(USER))
  findOne(@Param('id') id: string) {
    return this.flowersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(ADMIN))
  update(@Param('id') id: string, @Body() dto: UpdateFlowerDto) {
    return this.flowersService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(ADMIN))
  remove(@Param('id') id: string) {
    return this.flowersService.remove(+id);
  }
}
