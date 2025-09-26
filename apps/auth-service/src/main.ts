/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './app/auth.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../../../libs/proto/src/auth.proto'),
      url: '0.0.0.0:3001',
    }
  });

  await app.listen();
  Logger.log(`🚀 Application is running on gRPC :3001`);
}

bootstrap();
