import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateFlowerDto {
  @IsEmpty()
  id?: any;

  @ApiProperty({
    description: 'Name of Flower',
    example: 'Rose',
  })
  @IsString({ message: 'price is not a string' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'Color of Flower',
    example: 'White',
  })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({
    description: 'Price of Flower',
    example: 2.5,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
