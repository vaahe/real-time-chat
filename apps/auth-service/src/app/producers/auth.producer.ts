import { Observable } from 'rxjs';
import { ClientKafka } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { SignUpRequest } from '@vaahe/proto';

@Injectable()
export class AuthProducer {
    constructor(@Inject('AUTH_KAFKA_CLIENT') private readonly kafka: ClientKafka) { }

    sendUserSignupEvent(payload: SignUpRequest): Observable<any> {
        return this.kafka.emit('user.signup', payload);
    }
}