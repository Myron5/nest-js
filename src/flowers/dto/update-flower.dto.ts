import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsNumber, Min } from 'class-validator';

import { CreateFlowerDto } from './create-flower.dto';

export class UpdateFlowerDto extends PartialType(
  CreateFlowerDto,
  //   OmitType(CreateUserDto, ['name'] as const),
  //   PickType(CreateFlowerDto, ['color', 'price'] as const),
) {}

export class UpdateFlowerWithIdDto extends PartialType(CreateFlowerDto) {
  @ApiProperty({
    example: 2,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  id!: number;
}
