import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../services/auth.service';
import { type RegisterUserRequest, RegisterUserResponse } from '@vaahe/proto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'RegisterUser')
  async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    return this.authService.RegisterUser(request);
  }
}
