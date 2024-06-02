import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceEquipmentDto } from './create-maintenance_equipment.dto';

export class UpdateMaintenanceEquipmentDto extends PartialType(CreateMaintenanceEquipmentDto) {}
