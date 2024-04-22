import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceRequestTypeDto } from './create-maintenance_request_type.dto';

export class UpdateMaintenanceRequestTypeDto extends PartialType(CreateMaintenanceRequestTypeDto) {}
