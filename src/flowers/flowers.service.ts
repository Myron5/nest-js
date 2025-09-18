import { Injectable } from '@nestjs/common';
import { Flower } from '@prisma/client';

import { UniqueError } from 'src/common/Decorators/handle-unique-errors.decorator';
import { PrismaService } from 'src/prisma.service';

import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerWithIdDto } from './dto/update-flower.dto';

@Injectable()
export class FlowersService {
  constructor(private readonly prisma: PrismaService) {}

  @UniqueError()
  async create(dtos: CreateFlowerDto): Promise<Flower> {
    return await this.prisma.flower.create({ data: dtos });
  }

  @UniqueError()
  async createMany(dtos: CreateFlowerDto[]): Promise<Flower[]> {
    // return this.prisma.flower.createMany({data: dto, skipDuplicates: true }); // ==> {"count": 2}
    // return await this.prisma.$transaction(tx => dtos.map((item) => tx.flower.create({ data: item }))  );

    const results = await Promise.allSettled(
      dtos.map((dto) => this.prisma.flower.create({ data: dto })),
    );

    const successfulUpdates = results
      .filter(
        (result): result is PromiseFulfilledResult<Flower> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);

    return successfulUpdates;
  }

  async findAll(): Promise<Flower[]> {
    return await this.prisma.flower.findMany();
  }

  @UniqueError()
  async findOne(id: number): Promise<Flower | null> {
    return await this.prisma.flower.findUnique({ where: { id } });
  }

  async findMany(ids: number[]): Promise<Flower[]> {
    if (ids.length === 0) {
      return Promise.resolve([]);
    }
    return await this.prisma.flower.findMany({
      where: { id: { in: ids } },
    });
  }

  @UniqueError()
  async update(dto: UpdateFlowerWithIdDto): Promise<Flower | null> {
    const { id, ...objToUpdate } = dto;

    // findByIdAndUpdate  -  doesn't exist
    const existing = await this.prisma.flower.findUnique({ where: { id } });

    if (!existing) {
      return null;
    }

    return await this.prisma.flower.update({
      where: { id },
      data: objToUpdate,
    });
  }

  @UniqueError()
  async updateMany(dtos: UpdateFlowerWithIdDto[]): Promise<Flower[]> {
    if (dtos.length === 0) {
      return Promise.resolve([]);
    }

    // this.prisma.flower.updateMany({})   =>   {count:2}

    // return this.pgrisma.$transaction( objects.map
    // Returns error for whole array of ids
    // if one id is wrong

    const results = await Promise.allSettled(
      dtos.map(
        async ({ id, ...objToUpdate }) =>
          await this.prisma.flower.update({
            where: { id },
            data: objToUpdate,
          }),
      ),
    );

    const successfulUpdates = results
      .filter(
        (result): result is PromiseFulfilledResult<Flower> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);

    return successfulUpdates;
  }

  @UniqueError()
  async remove(id: number): Promise<Flower | null> {
    const existing = await this.prisma.flower.findUnique({ where: { id } });
    if (!existing) {
      return null;
    }
    return await this.prisma.flower.delete({
      where: { id },
    });
  }

  async removeMany(ids: number[]): Promise<Flower[] | null> {
    if (ids.length === 0) {
      return Promise.resolve([]);
    }

    const flowersToDelete = await this.prisma.flower.findMany({
      where: { id: { in: ids } },
    });

    await this.prisma.flower.deleteMany({
      where: { id: { in: ids } },
    }); // Answear in this case {"count": 2}

    return flowersToDelete;

    // return await this.prisma.$transaction(async (tx) => { tx = this.prisma });
  }
}
