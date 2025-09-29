import { join } from "path";
import { Controller, OnModuleInit } from "@nestjs/common";
import { Client, type ClientGrpc, Transport } from "@nestjs/microservices";

@Controller('user')
export class UserGateway implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: 'localhost:3001',
            package: "user",
            protoPath: join(__dirname, '../../../libs/proto/src/user.proto')
        },
    })
    private client!: ClientGrpc;

    private userService: any;

    onModuleInit() {
        this.userService = this.client.getService<any>('UserService');
    }
}