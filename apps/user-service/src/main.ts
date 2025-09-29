import { join } from 'path';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UserModule } from './app/modules/user.module';

async function bootstrap() {
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../libs/proto/src/protos/user.proto'),
      url: '0.0.0.0:3002',
    }
  });

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-service',
        brokers: ['localhost:9092']
      },
      consumer: {
        groupId: 'user-consumer'
      },
    },
  });

  await Promise.all([grpcApp.listen(), kafkaApp.listen()]);

  Logger.log(`🚀 Application is running on:`);
  Logger.log('gRPC -> :3002');
  Logger.log('kafka -> broker localhost:9092');
}

bootstrap();
