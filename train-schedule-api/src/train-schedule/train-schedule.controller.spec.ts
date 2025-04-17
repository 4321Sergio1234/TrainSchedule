import { Test, TestingModule } from '@nestjs/testing';
import { TrainScheduleController } from './train-schedule.controller';

describe('TrainScheduleController', () => {
  let controller: TrainScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainScheduleController],
    }).compile();

    controller = module.get<TrainScheduleController>(TrainScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
