import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserService } from '../services/user.service';
import { PrismaUserService } from '../services/prisma.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserConsumer } from '../consumers/user.consumer';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'USER_KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'user-service',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'user-consumer'
          }
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserConsumer, PrismaUserService],
})
export class UserModule { }
