import { Injectable } from '@nestjs/common';
import { RegisterUserRequest, RegisterUserResponse } from '@vaahe/proto';

@Injectable()
export class AuthService {
  async registerUser(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    if (!request.email || !request.password) {
      return {
        data: {
          statusCode: 400,
          message: 'Email and password are required',
          data: {},
        },
      };
    }
  }
}
