import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsEmpty,
} from 'class-validator';
import { LIMITATIONS, MESSAGES } from 'src/common/constants';

export class CreateUserDto {
  @IsEmpty()
  id?: any;

  @ApiProperty({
    description: 'Name of User',
    example: 'jsmith133',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITATIONS.NAME.MIN, { message: MESSAGES.VALIDATE.NAME_MIN })
  @MaxLength(LIMITATIONS.NAME.MAX, { message: MESSAGES.VALIDATE.NAME_MAX })
  name: string;

  @ApiPropertyOptional({
    description: 'Email of user',
    example: 'john.smith@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(LIMITATIONS.EMAIL.MAX, { message: MESSAGES.VALIDATE.EMAIL_MAX })
  email?: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'SecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(LIMITATIONS.PASSWORD.MIN, {
    message: MESSAGES.VALIDATE.PASSWORD_MIN,
  })
  @MaxLength(LIMITATIONS.PASSWORD.MAX, {
    message: MESSAGES.VALIDATE.PASSWORD_MAX,
  })
  @Matches(LIMITATIONS.PASSWORD.REGEX, {
    message: MESSAGES.VALIDATE.PASSWORD_FORMAT,
  })
  password: string;
}

export class SigninDto {
  @ApiProperty({
    description: 'Name or email of User',
    example: 'jsmith133 or john.smith@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  nameOrEmail: string;

  @ApiProperty({
    description: 'Password of user',
    example: 'SecurePassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RefreshToken {
  @ApiProperty({
    description: 'Refresh Token',
    example: 'eyJtaXJvLm9yaWdpbiI6ImV1MDEifQPIBKmE9rzQuL3bUeAvUEGFEhLk',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
