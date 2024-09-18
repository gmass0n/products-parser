import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { DocsModule } from './shared/docs/docs.module';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());

  const docsModule = new DocsModule();
  await docsModule.setup(app);

  await app.listen(process.env.PORT, process.env.HOST);
})();
