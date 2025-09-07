import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
  transform(value: any): number[] | null {
    if (value === undefined) {
      return value;
    }

    if (typeof value === 'string') {
      return value.split(',').map((item) => this.parseInteger(item));
    }

    throw new BadRequestException(
      'Validation failed (array of numbers expected)',
    );
  }

  private parseInteger(value: string): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new BadRequestException(
        `Validation failed (${value} is not a number)`,
      );
    }
    return parsed;
  }
}
