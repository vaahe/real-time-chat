import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { AuthService } from '../services/auth.service';
import { AuthProducer } from '../producers/auth.producer';
import { PrismaAuthService } from '../services/prisma.service';
import { AuthController } from '../controllers/auth.controller';
import { AuthRepository } from '../repositories/auth.repository';
import { Partitioners } from 'kafkajs';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
    ClientsModule.register([
      {
        name: 'AUTH_KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth-service',
            brokers: ['127.0.0.1:9092'],
            createPartitioner: Partitioners.LegacyPartitioner
          },
          consumer: {
            groupId: 'auth-consumer'
          },
          producerOnlyMode: true
        }
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: '../../../libs/proto/src/protos/user.proto',
          url: '0.0.0.0:3002',
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthProducer, AuthService, PrismaAuthService, AuthRepository],
})
export class AuthModule { }
