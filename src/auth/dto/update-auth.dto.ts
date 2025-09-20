import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';

import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { LIMITATIONS, MESSAGES } from 'src/common/constants';

import { CreateUserDto } from './signin.dto';

export function PhoneNumTransformAndCheck(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    // ✅ transform (spaces (other signs)) delete  AND ensure '+')
    Transform(({ value }) => {
      if (!value) {
        return value;
      }
      let cleaned = value.replace(/\D/g, ''); // \D = all what is not number del
      cleaned = '+' + cleaned;
      return cleaned;
    })(object, propertyName);

    // ✅ validation
    registerDecorator({
      name: 'PhoneNumTransformAndCheck',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return LIMITATIONS.PHONE.REGEX.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return MESSAGES.VALIDATE.PHONE_NUMBER_FORMAT();
        },
      },
    });
  };
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description:
      'Phone number of User (auto-transformed to +XXXXXXXXXXX format)',
    example: '+380984739205',
  })
  @IsString()
  @IsNotEmpty()
  @PhoneNumTransformAndCheck()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Avatar of the User (image file)',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  avatar?: any; // any for swagger to appear button
}
