import { Injectable, Logger } from '@nestjs/common';
import type { SignUpRequest } from '@vaahe/proto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Injectable()
export class UserConsumer {
    private readonly logger = new Logger(UserConsumer.name);

    @EventPattern('user.signup')
    signUp(@Payload() data: SignUpRequest) {
        this.logger.log(`Received data from Kafka: ${JSON.stringify(data)}`);
    }
}
