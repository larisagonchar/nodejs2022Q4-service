import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { load } from 'js-yaml';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = load(
    readFileSync('./doc/api.yaml', 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}
bootstrap();
