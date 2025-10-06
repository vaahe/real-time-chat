import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserService } from '../services/user.service';
import { UserConsumer } from '../consumers/user.consumer';
import { PrismaUserService } from '../services/prisma.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController, UserConsumer],
  providers: [UserService, UserRepository, PrismaUserService],
})
export class UserModule { }
