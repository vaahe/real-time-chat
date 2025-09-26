import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('AuthService', 'Test')
  test(data: { message: string }) {
    return { reply: `Auth service received: ${data.message}` };
  }
}
