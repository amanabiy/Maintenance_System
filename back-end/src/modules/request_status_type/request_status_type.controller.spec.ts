import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusTypeController } from './request_status_type.controller';
import { RequestStatusTypeService } from './request_status_type.service';

describe('RequestStatusTypeController', () => {
  let controller: RequestStatusTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestStatusTypeController],
      providers: [RequestStatusTypeService],
    }).compile();

    controller = module.get<RequestStatusTypeController>(RequestStatusTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
