import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocsModule } from './shared/docs/docs.module';
import { ConfigService } from '@nestjs/config';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  const docsModule = new DocsModule();
  await docsModule.setup(app);

  const configService = app.get(ConfigService);

  const { host, port } = configService.get('server');

  await app.listen(port, host);
})();
