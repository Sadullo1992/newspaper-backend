import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Temporary fix for BigInt serialization
// https://github.com/expressjs/express/issues/4453
declare global {
  interface BigInt {
    toJSON(): number
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

  await app.listen(PORT);

}
bootstrap();
