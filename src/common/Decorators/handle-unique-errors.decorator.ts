import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

export function UniqueError(): MethodDecorator {
  return function (target, propertyKey, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const res = await originalMethod.apply(this, args);
        if (res === null) {
          throw new NotFoundException();
        }
        return res;
      } catch (error) {
        // If prisma db return unique error (P2002)
        // server will return 409 instead of 500
        if (error.code === 'P2002') {
          throw new ConflictException(
            'Flower with this name and this color already exists',
          );
        }

        // Prisma validation error (Wrong request from DB)
        if (error.name === 'PrismaClientValidationError') {
          const message = error.message.includes('Unknown argument `id`')
            ? 'Cannot update flower ID. ID field is immutable.'
            : "'Invalid request data'";
          throw new BadRequestException(message);
        }

        throw error;
      }
    };

    return descriptor;
  };
}
