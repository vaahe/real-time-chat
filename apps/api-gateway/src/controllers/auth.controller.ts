import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller('auth')
export class AuthGatewayController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {}

    @Post('test')
    async test(@Body() body) {
        return this.authClient.send({ cmd: 'test' }, body);
    }
}