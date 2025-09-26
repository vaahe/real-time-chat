import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const authController = app.get<AuthController>(AuthController);
      expect(authController.test({ message: 'Hello API' })).toEqual({ message: 'Hello API' });
    });
  });
});
