import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { load } from 'js-yaml';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

async function bootstrap() {
  config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = load(
    readFileSync('./doc/api.yaml', 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
