import { JwtService } from '@nestjs/jwt';
import type { ClientGrpc } from "@nestjs/microservices";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, type UserServiceClient } from '@vaahe/proto';

import { AuthProducer } from "../producers/auth.producer";
import { AuthRepository } from "../repositories/auth.repository";

@Injectable()
export class AuthService implements OnModuleInit {
  private userService!: UserServiceClient;

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientGrpc,

    private readonly authProducer: AuthProducer,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) { }

  onModuleInit() {
    this.userService = this.userClient.getService<UserServiceClient>('UserService');
  }

  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    const { email } = request;

    const existingUser = await this.userService.getUser

    // await this.authRepository.signUp(request);
    await this.authProducer.sendUserSignUpEvent(request);

    return { data: { statusCode: 201, message: 'User created', data: request } };
  }

  async signIn(request: SignInRequest): Promise<SignInResponse> {
    const { email, password } = request;
    const user = { email, password };


    this.authProducer.sendUserSignInEvent(request);

    return { data: { statusCode: 201, message: 'Logged in', data: { ...user } } };
  }

  async signOut() {
    return null;
  }
}
