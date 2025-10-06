import { Controller, Logger } from '@nestjs/common';
import type { SignUpRequest } from '@vaahe/proto';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserConsumer {
    private readonly logger = new Logger(UserConsumer.name);

    constructor(private readonly userService: UserService) { }

    @EventPattern('user.signup')
    async signUp(@Payload() data: SignUpRequest) {
        await this.userService.createUser(data);
        this.logger.log(`Received data from Kafka: ${JSON.stringify(data)}`);
    }
}
