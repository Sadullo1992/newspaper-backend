import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as YAML from 'yaml';
import { AppModule } from './app.module';

// Temporary fix for BigInt serialization
// https://github.com/expressjs/express/issues/4453
declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this.toString());
};

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global config validator
  app.useGlobalPipes(new ValidationPipe());

  // Config open api file
  const file = await readFile(join(process.cwd(), './doc/api.yaml'), {
    encoding: 'utf8',
  });
  const swaggerDocument = YAML.parse(file);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(PORT);
}
bootstrap();
