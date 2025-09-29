/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './app/auth.module';
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

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-service',
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'auth-consumer'
      },
    },
  });

  await Promise.all([grpcApp.listen(), kafkaApp.listen()]);
  Logger.log(`🚀 Application is running on:`);
  Logger.log('gRPC -> :3001');
  Logger.log('kafka -> broker localhost:9092');
}

bootstrap();
