import type { SignUpRequest } from '@vaahe/proto';
import { Injectable, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserConsumer {
    private readonly logger = new Logger(UserConsumer.name);

    constructor(private readonly userRepository: UserRepository) { };

    @MessagePattern('user.signup')
    async handleUserRegistered(@Payload() payload: SignUpRequest) {
        this.logger.log(`Received signup event: ${JSON.stringify(payload)}`);

        // try {
        //     await this.userRepository.create(payload);
        //     this.logger.log(`✅ User created: ${payload.email}`);
        // } catch (error: unknown) {
        //     if (error instanceof Error) {
        //         this.logger.error(`❌ Failed to create user: ${error.message}`);
        //     }

        //     throw new Error('Failed to create user: Unknown error.');
        // }
    }
}