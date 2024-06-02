import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceEquipmentController } from './maintenance_equipment.controller';
import { MaintenanceEquipmentService } from './maintenance_equipment.service';

describe('MaintenanceEquipmentController', () => {
  let controller: MaintenanceEquipmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceEquipmentController],
      providers: [MaintenanceEquipmentService],
    }).compile();

    controller = module.get<MaintenanceEquipmentController>(MaintenanceEquipmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
