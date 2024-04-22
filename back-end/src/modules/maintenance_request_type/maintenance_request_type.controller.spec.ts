import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceRequestTypeController } from './maintenance_request_type.controller';
import { MaintenanceRequestTypeService } from './maintenance_request_type.service';

describe('MaintenanceRequestTypeController', () => {
  let controller: MaintenanceRequestTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceRequestTypeController],
      providers: [MaintenanceRequestTypeService],
    }).compile();

    controller = module.get<MaintenanceRequestTypeController>(MaintenanceRequestTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
