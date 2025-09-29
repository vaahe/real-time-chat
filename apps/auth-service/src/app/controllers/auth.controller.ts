import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { type SignUpRequest, SignUpResponse } from '@vaahe/proto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @GrpcMethod('AuthService', 'RegisterUser')
  async registerUser(request: SignUpRequest): Promise<SignUpResponse> {
    return this.authService.signIn(request);
  }
}
