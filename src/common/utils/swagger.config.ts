import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

interface SwaggerOptions {
  title: string;
  description?: string;
  version?: string;
  url?: string;
}

const defaultOptions = {
  description: '',
  version: '1.0',
  url: 'docs',
};

export const setSwagger = <T extends INestApplication>(
  app: T,
  optionsArg: SwaggerOptions,
): void => {
  const options = { ...defaultOptions, ...optionsArg };

  const config = new DocumentBuilder()
    .setTitle(options.title)
    .setDescription(options.description)
    .setVersion(options.version)
    .addTag('cats')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(options.url, app, documentFactory);
};
