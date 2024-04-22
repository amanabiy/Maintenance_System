import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { MaintenanceRequest } from '../entities/maintenance_request.entity';

export class FindAllResponseMaintenanceRequestDto extends FindAllResponseDto<MaintenanceRequest> {
  constructor(page: number, limit: number, total: number, items: MaintenanceRequest[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of MaintenanceRequest',
    type: () => MaintenanceRequest,
    isArray: true,
  })
  items: MaintenanceRequest[];
}
