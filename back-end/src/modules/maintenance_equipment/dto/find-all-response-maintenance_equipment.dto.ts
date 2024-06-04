import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { MaintenanceEquipment } from '../entities/maintenance_equipment.entity';

export class FindAllResponseMaintenanceEquipmentDto extends FindAllResponseDto<MaintenanceEquipment> {
  constructor(page: number, limit: number, total: number, items: MaintenanceEquipment[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of MaintenanceEquipment',
    type: () => MaintenanceEquipment,
    isArray: true,
  })
  items: MaintenanceEquipment[];
}
