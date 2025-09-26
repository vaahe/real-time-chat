/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.PORT || 3001;

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../../../libs/proto/auth.proto'),
      url: '0.0.0.0.3001',
    }
  });

  await app.listen();
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
