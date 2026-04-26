import { join } from "path";
import { Observable } from 'rxjs';

import type { ClientGrpc } from "@nestjs/microservices";
import { Client, Transport } from "@nestjs/microservices";
import { Controller, Post, Body, OnModuleInit } from "@nestjs/common";
import { AUTH_PACKAGE_NAME, AuthServiceClient, type SignUpRequest, SignUpResponse } from '@vaahe/proto';


@Controller('payment')
export class PaymentGateway implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: 'localhost:3001',
            package: PAYMENT_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../libs/proto/src/protos/payment.proto')
        },
    })
    private client!: ClientGrpc;

    private authService!: AuthServiceClient;

    onModuleInit() {
        this.authService = this.client.getService<AuthServiceClient>('AuthService');
    }

    @Post('sign-up')
    async signUp(@Body() body: SignUpRequest): Promise<Observable<SignUpResponse>> {
        return this.authService.signUp(body);
    }
}
