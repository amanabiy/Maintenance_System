import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusTypeService } from './request_status_type.service';

describe('RequestStatusTypeService', () => {
  let service: RequestStatusTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestStatusTypeService],
    }).compile();

    service = module.get<RequestStatusTypeService>(RequestStatusTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
