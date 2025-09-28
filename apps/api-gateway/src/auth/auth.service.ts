import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { AUTH_SERVICE_NAME, AuthServiceClient, RegisterUserRequest } from "@vaahe/proto";
import { ServicesNames } from "../config/consts";
import type { ClientGrpc } from "@nestjs/microservices";
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
    private authServiceClient: AuthServiceClient;

    constructor(@Inject(ServicesNames.AUTH_SERVICE) private client: ClientGrpc) { }

    onModuleInit() {
        this.authServiceClient = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    }

    async registerUser(payload: RegisterUserRequest) {
        return firstValueFrom(this.authServiceClient.registerUser(payload));
    }
}