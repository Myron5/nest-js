import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setSwagger } from './common/utils/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setSwagger<typeof app>(app, { title: 'Flowers API' });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
