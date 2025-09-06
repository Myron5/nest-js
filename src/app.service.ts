import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { EnumAppModes } from './common/types/enumAppModes';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  getMode(): EnumAppModes | undefined {
    const MODE = this.configService.get<EnumAppModes>('MODE');
    return MODE;
  }

  getHelloId(id: number): string {
    const template = `Hello ${id} string text`;
    return template;
  }
}
