import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: 'AUTH_PACKAGE',
          useValue: {
            test: jest.fn().mockReturnValue({ message: 'ok' })
          }
        }
      ]
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  describe('test', () => {
    it('should return message with name', () => {
      expect(appController.testAuth('Vahe')).toEqual({ message: "Auth service received: Vahe" });
    });
  });
});
