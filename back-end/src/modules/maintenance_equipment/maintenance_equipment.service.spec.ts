import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceEquipmentService } from './maintenance_equipment.service';

describe('MaintenanceEquipmentService', () => {
  let service: MaintenanceEquipmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintenanceEquipmentService],
    }).compile();

    service = module.get<MaintenanceEquipmentService>(MaintenanceEquipmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
