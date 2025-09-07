import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ArrayOrDtoValidationPipe implements PipeTransform {
  constructor(private readonly dto) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (Array.isArray(value)) {
      const objects: Object[] = plainToInstance(this.dto, value);
      for (const obj of objects) {
        const errors = await validate(obj);
        if (errors.length > 0) {
          throw new BadRequestException(this.formatErrors(errors));
        }
      }
      return objects;
    }

    const object = plainToInstance(this.dto, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }
    return object;
  }

  private formatErrors(errors: any[]) {
    return errors.map((err) => Object.values(err.constraints ?? {})).flat();
  }
}
