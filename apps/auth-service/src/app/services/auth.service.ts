import { Injectable } from '@nestjs/common';
import { RegisterUserRequest, RegisterUserResponse } from '@vaahe/proto';

@Injectable()
export class AuthService {
  async RegisterUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const { firstName, lastName, email, password, role } = request;

    const user = { firstName, lastName, email, password, role };

    return { data: { statusCode: 201, message: 'User created', data: { ...user } } };
  }
}
