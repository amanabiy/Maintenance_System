import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestTypeService } from './maintenance_request_type.service';

describe('MaintenanceRequestTypeService', () => {
  let service: MaintenanceRequestTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceRequestTypeService],
    }).compile();

    service = module.get<MaintenanceRequestTypeService>(MaintenanceRequestTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
