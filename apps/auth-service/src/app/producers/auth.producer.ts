import { Observable } from 'rxjs';
import { ClientKafka } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { SignInRequest, SignUpRequest } from '@vaahe/proto';

@Injectable()
export class AuthProducer {
    constructor(@Inject('AUTH_KAFKA_CLIENT') private readonly kafka: ClientKafka) { }

    async sendUserSignUpEvent(payload: SignUpRequest): Promise<Observable<SignUpRequest>> {
        return this.kafka.emit('user.signup', payload);
    }

    async sendUserSignInEvent(payload: SignInRequest): Promise<Observable<SignInRequest>> {
        return this.kafka.emit('user.signin', payload);
    }
}