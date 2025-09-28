import { Controller, Get, Inject, Query } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController {
  private authService!: AuthService;

  constructor(@Inject('AUTH_PACKAGE') private readonly client: ClientGrpc) { }

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Get('test')
  testAuth(@Query('name') name = 'Guest') {
    return this.authService.test({ name });
  }
}
