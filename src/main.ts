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

  const baseUrl = `http://${process.env.MODE === 'dev' ? 'localhost' : ''}:${process.env.PORT ?? 3000}`;
  console.log('App works on: ', baseUrl + '/api');
  console.log('Health check route: ', baseUrl + '/api/hello');
  console.log('Swagger works on: ', baseUrl + '/docs#');
  console.log('GraphQL playground: ', baseUrl + '/graphql');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
