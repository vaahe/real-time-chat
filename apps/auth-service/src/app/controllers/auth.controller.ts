import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import type { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse } from '@vaahe/proto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @GrpcMethod('AuthService', 'SignUp')
  async signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.authService.signUp(request);
  }

  @GrpcMethod('AuthService', 'SignIn')
  async signIn(request: SignInRequest): Promise<SignInResponse> {
    return this.authService.signIn(request);
  }

  @GrpcMethod('AuthService', 'SignOut')
  async signOut() {
    return null;
  }

  @GrpcMethod('AuthService', 'RefreshToken')
  async refreshToken() {
    return null;
  }
}
