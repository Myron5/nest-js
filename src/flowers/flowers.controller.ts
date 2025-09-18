import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, AuthGuardLevels } from 'src/common/Guards/AuthGuard';
import { ArrayOrDtoValidationPipe } from 'src/common/Pipes/ArrayOrDtoValidationPipe';
import { ParseIntArrayPipe } from 'src/common/Pipes/ParseIntArrayPipe';
import { FlowersService } from './flowers.service';

import { CreateFlowerDto } from './dto/create-flower.dto';
import {
  UpdateFlowerDto,
  UpdateFlowerWithIdDto,
} from './dto/update-flower.dto';

const { USER, ADMIN } = AuthGuardLevels;

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @Post()
  @UseGuards(AuthGuard(ADMIN))
  create(
    @Body(new ArrayOrDtoValidationPipe(CreateFlowerDto))
    dto: CreateFlowerDto | CreateFlowerDto[],
  ) {
    if (Array.isArray(dto)) {
      return this.flowersService.createMany(dto);
    }
    return this.flowersService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard(USER))
  findMany(@Query('ids', ParseIntArrayPipe) ids: number[]) {
    if (ids === undefined) {
      // if there is no ids, ===> then its findAll
      return this.flowersService.findAll();
    }
    return this.flowersService.findMany(ids);
  }

  @Get(':id')
  @UseGuards(AuthGuard(USER))
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.findOne(id);
  }

  @Patch()
  @UseGuards(AuthGuard(ADMIN))
  updateMany(
    @Body(new ArrayOrDtoValidationPipe(UpdateFlowerWithIdDto))
    dto: UpdateFlowerWithIdDto[],
  ) {
    return this.flowersService.updateMany(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard(ADMIN))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFlowerDto) {
    return this.flowersService.update({ id, ...dto });
  }

  @Delete()
  @UseGuards(AuthGuard(ADMIN))
  removeMany(@Query('ids', ParseIntArrayPipe) ids: number[]) {
    return this.flowersService.removeMany(ids);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(ADMIN))
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.flowersService.remove(id);
  }
}
