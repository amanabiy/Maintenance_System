import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { MaintenanceRequestType } from '../entities/maintenance_request_type.entity';

export class FindAllResponseMaintenanceRequestTypeDto extends FindAllResponseDto<MaintenanceRequestType> {
  constructor(page: number, limit: number, total: number, items: MaintenanceRequestType[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of MaintenanceRequestType',
    type: () => MaintenanceRequestType,
    isArray: true,
  })
  items: MaintenanceRequestType[];
}
