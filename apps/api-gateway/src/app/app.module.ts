import { Module } from '@nestjs/common';
import { AuthGateway } from '../gateways/auth.gateway';
import { UserGateway } from '../gateways/user.gateway';

@Module({
  imports: [],
  controllers: [AuthGateway, UserGateway],
  providers: []
})
export class AppModule { }
