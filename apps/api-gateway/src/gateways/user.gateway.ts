import { join } from "path";
import { Body, Controller, OnModuleInit, Post } from "@nestjs/common";
import { Client, type ClientGrpc, Transport } from "@nestjs/microservices";
import { CreateUserRequest, type SignUpRequest, SignUpResponse, UserServiceClient } from "@vaahe/proto";
import { Observable } from "rxjs";

@Controller('user')
export class UserGateway implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: 'localhost:3001',
            package: "user",
            protoPath: join(__dirname, '../../../libs/proto/src/protos/user.proto')
        },
    })
    private client!: ClientGrpc;

    private userService!: UserServiceClient;

    onModuleInit() {
        this.userService = this.client.getService<UserServiceClient>('UserService');
    }

    @Post('create')
    async signUp(@Body() body: SignUpRequest): Promise<Observable<SignUpResponse>> {
        return this.userService.createUser(body);
    }
}