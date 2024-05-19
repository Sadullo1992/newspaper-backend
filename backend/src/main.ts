import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;

  const app = await NestFactory.create(AppModule);

  // Global config validator
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
