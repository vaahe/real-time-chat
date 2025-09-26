import { Controller, Get, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';

interface AuthService {
  test(data: { message: string }): Observable<{ reply: string }>;
}

@Controller()
export class AppController {
  private authService: AuthService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) { }

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Get('test')
  testAuth() {
    return this.authService.test({ message: 'Hello from Gateway!' });
  }
}
