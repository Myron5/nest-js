import { Injectable } from '@nestjs/common';
import { Flower } from '@prisma/client';

import { UniqueError } from 'src/common/Decorators/handle-unique-errors.decorator';
import { PrismaService } from 'src/prisma.service';

import { CreateFlowerDto } from './dto/create-flower.dto';
import {
  UpdateFlowerDto,
  UpdateFlowerWithIdDto,
} from './dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  @UniqueError()
  create(dtos: CreateFlowerDto): Promise<Flower> {
    return this.prisma.flower.create({ data: dtos });
  }

  @UniqueError()
  createMany(dtos: CreateFlowerDto[]): Promise<Flower[]> {
    // return this.prisma.flower.createMany({
    //   data: dto,
    //   skipDuplicates: true,
    // });
    // Answear in this case {"count": 2}

    return this.prisma.$transaction(
      dtos.map((item) => this.prisma.flower.create({ data: item })),
    );
    // Answear in this case [{...dataFlower1}, ...]
  }

  findAll(): Promise<Flower[]> {
    return this.prisma.flower.findMany();
  }

  findOne(id: number): Promise<Flower | null> {
    return this.prisma.flower.findUnique({ where: { id } });
  }

  findMany(ids: number[]): Promise<Flower[] | null> {
    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    return this.prisma.flower.findMany({
      where: { id: { in: ids } },
    });
  }

  @UniqueError()
  update(id: number, dto: UpdateFlowerDto): Promise<Flower | null> {
    return this.prisma.flower.update({
      where: { id },
      data: dto,
    });
  }

  @UniqueError()
  updateMany(objcts: UpdateFlowerWithIdDto[]): Promise<Flower[] | null> {
    if (objcts.length === 0) {
      return Promise.resolve([]);
    }

    return this.prisma.$transaction(
      objcts.map(({ id, ...dto }) =>
        this.prisma.flower.update({
          where: { id },
          data: dto,
        }),
      ),
    );
  }

  remove(id: number): Promise<Flower | null> {
    return this.prisma.flower.delete({
      where: { id },
    });
  }

  removeMany(ids: number[]): Promise<Flower[] | null> {
    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    return this.prisma.$transaction(async (tx) => {
      const flowersToDelete = await tx.flower.findMany({
        where: { id: { in: ids } },
      });

      await tx.flower.deleteMany({
        where: { id: { in: ids } },
      }); // Answear in this case {"count": 2}

      return flowersToDelete;
    });
  }
}
