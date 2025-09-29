import { Inject, Injectable } from "@nestjs/common";
import type { ClientKafka } from "@nestjs/microservices";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@vaahe/proto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_KAFKA_CLIENT') private readonly kafka: ClientKafka) { }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    const { firstName, lastName, email, password, role } = request;
    const user = { firstName, lastName, email, password, role };

    this.kafka.emit('user.signup', { user });

    return { data: { statusCode: 201, message: 'User created', data: { ...user } } };
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const { email, password } = request;
    const user = { email, password };

    return { data: { statusCode: 201, message: 'User created', data: { ...user } } };
  }
}
