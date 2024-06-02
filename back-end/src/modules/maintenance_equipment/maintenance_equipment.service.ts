import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { MaintenanceEquipment } from './entities/maintenance_equipment.entity';
import { CreateMaintenanceEquipmentDto } from './dto/create-maintenance_equipment.dto';
import { UpdateMaintenanceEquipmentDto } from './dto/update-maintenance_equipment.dto';

@Injectable()
export class MaintenanceEquipmentService extends GenericDAL<MaintenanceEquipment, CreateMaintenanceEquipmentDto, UpdateMaintenanceEquipmentDto> {
  constructor(
    @InjectRepository(MaintenanceEquipment)
    private readonly maintenanceEquipmentRepository: Repository<MaintenanceEquipment>,
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    super(maintenanceEquipmentRepository, 1, 10, ['maintenanceRequest']);
  }

  async create(equipmentData: CreateMaintenanceEquipmentDto): Promise<MaintenanceEquipment> {
    const { maintenanceRequestId, ...rest } = equipmentData;
    const maintenanceRequest = await this.maintenanceRequestService.findOne(maintenanceRequestId);
    if (!maintenanceRequest) {
      throw new Error('Maintenance request not found');
    }

    const equipment = await super.create({
      ...rest,
      maintenanceRequest,
    });

    return equipment;
  }
}