import { Module } from '@nestjs/common';
import { AuthGateway } from '../gateways/auth.gateway';
import { UserGateway } from '../gateways/user.gateway';
import { PaymentGateway } from '../gateways/payment.gateway';

@Module({
  imports: [],
  controllers: [AuthGateway, UserGateway, PaymentGateway],
})
export class AppModule { }
