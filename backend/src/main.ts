import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { AllExceptionsFilter } from 'src/exceptions/all-exceptions.filter';
import * as YAML from 'yaml';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { LogService } from './logger/logger.service';

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

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  // Global Logger
  const logger = app.get<LogService>(LogService);
  app.useLogger(logger);

  // Logging interceptor
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  // Exceptions Filter
  const { httpAdapter } = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  // Global config validator
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }));

  // Config open api file
  const file = await readFile(join(process.cwd(), './doc/api.yaml'), {
    encoding: 'utf8',
  });
  const swaggerDocument = YAML.parse(file);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(PORT);

  process.on('unhandledRejection', () => {
    logger.log('unhandledRejection');
    logger.error('unhandledRejection');
  });

  process.on('uncaughtException', () => {
    logger.log('uncaughtException');
    logger.error('uncaughtException');
  });
}
bootstrap();
