import { Test, TestingModule } from '@nestjs/testing';
import { MediaFilesController } from './media-files.controller';
import { MediaFilesService } from './media-files.service';

describe('MediaFilesController', () => {
  let controller: MediaFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaFilesController],
      providers: [MediaFilesService],
    }).compile();

    controller = module.get<MediaFilesController>(MediaFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
