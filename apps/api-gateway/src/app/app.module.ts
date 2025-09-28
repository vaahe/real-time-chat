import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { join } from 'path';
import { protobufAuthPackage } from '@vaahe/proto';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: protobufAuthPackage,
          protoPath: join(__dirname, '../../../libs/proto/src/auth.proto'),
          url: 'localhost:3001',
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule { }
