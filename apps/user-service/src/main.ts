import { join } from 'path';
import { Partitioners } from 'kafkajs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UserModule } from './app/modules/user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../../libs/proto/src/protos/user.proto'),
      url: '0.0.0.0:3002',
    }
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user-service-client',
        brokers: ['127.0.0.1:9092'],
        createPartitioner: Partitioners.LegacyPartitioner
      },
      consumer: {
        groupId: 'user-consumer-group'
      }
    }
  });

  await app.startAllMicroservices();

  Logger.log('🚀 gRPC running on 0.0.0.0:3002');
  Logger.log('🚀 Kafka consumer connected');
}

bootstrap();
