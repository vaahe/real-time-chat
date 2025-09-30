import { Injectable } from "@nestjs/common";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@vaahe/proto';
import { AuthProducer } from "../producers/auth.producer";
import { AuthRepository } from "../repositories/auth.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly authProducer: AuthProducer,
    private readonly authRepository: AuthRepository
  ) { }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    await this.authRepository.signUp(request);
    this.authProducer.sendUserSignupEvent(request);

    return { data: { statusCode: 201, message: 'User created', data: request } };
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const { email, password } = request;
    const user = { email, password };

    return { data: { statusCode: 201, message: 'Logged in', data: { ...user } } };
  }
}
