import type { SignUpRequest } from '@vaahe/proto';
import { Injectable, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserConsumer {
    private readonly logger = new Logger(UserConsumer.name);

    constructor(private readonly userRepository: UserRepository) { };

    @MessagePattern('user.signup')
    async handleUserSignup(@Payload() payload: SignUpRequest) {
        this.logger.log(`Received signup event: ${JSON.stringify(payload)}`);
        await this.userRepository.create(payload);
    }
}