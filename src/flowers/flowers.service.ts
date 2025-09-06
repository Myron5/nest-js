import { Injectable } from '@nestjs/common';

import { Flower } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateFlowerDto) {
    return this.prisma.flower.create({ data: dto });
  }

  findAll(): Promise<Flower[]> {
    return this.prisma.flower.findMany();
  }

  findOne(id: number): Promise<Flower | null> {
    return this.prisma.flower.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateFlowerDto): Promise<Flower> {
    return this.prisma.flower.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number): Promise<Flower> {
    return this.prisma.flower.delete({
      where: { id },
    });
  }
}
