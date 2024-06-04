import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatusTimeService } from './request_status_time.service';

describe('RequestStatusTimeService', () => {
  let service: RequestStatusTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestStatusTimeService],
    }).compile();

    service = module.get<RequestStatusTimeService>(RequestStatusTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
