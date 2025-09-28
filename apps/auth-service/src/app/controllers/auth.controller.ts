import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @GrpcMethod('AuthService', 'Test')
  test(data: { name: string }): { message: string } {
    return { message: `Auth service received: ${data.name}` };
  }
}
