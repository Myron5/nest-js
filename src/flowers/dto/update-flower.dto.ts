import { PartialType } from '@nestjs/swagger';
import { CreateFlowerDto } from './create-flower.dto';

export class UpdateFlowerDto extends PartialType(
  CreateFlowerDto,
  //   OmitType(CreateUserDto, ['name'] as const),
  //   PickType(CreateFlowerDto, ['color', 'price'] as const),
) {}
