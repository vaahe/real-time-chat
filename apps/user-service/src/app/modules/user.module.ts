import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserService } from '../services/user.service';
import { PrismaUserService } from '../services/prisma.service';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
  providers: [UserService, PrismaUserService],
})
export class UserModule { }
