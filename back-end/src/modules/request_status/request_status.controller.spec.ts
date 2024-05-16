import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusController } from './request_status.controller';
import { RequestStatusService } from './request_status.service';

describe('RequestStatusController', () => {
  let controller: RequestStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestStatusController],
      providers: [RequestStatusService],
    }).compile();

    controller = module.get<RequestStatusController>(RequestStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
