import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestController } from './maintenance_request.controller';
import { MaintenanceRequestService } from './maintenance_request.service';

describe('MaintenanceRequestController', () => {
  let controller: MaintenanceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestController],
      providers: [MaintenanceRequestService],
    }).compile();

    controller = module.get<MaintenanceRequestController>(MaintenanceRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
