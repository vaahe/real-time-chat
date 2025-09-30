/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app/modules/auth.module';
import { join } from 'path';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: join(__dirname, '../../../libs/proto/src/protos/auth.proto'),
      url: '0.0.0.0:3001',
    }
  });

  await grpcApp.listen();
  Logger.log(`🚀 Application is running on: gRPC -> :3001`);
}

bootstrap();
