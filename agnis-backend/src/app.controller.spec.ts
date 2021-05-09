import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './Presentation/Controllers/app.controller';
import { AppService } from './Application/Services/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getTest()).toBeTruthy();
    });
  });
});
