import { PartialType } from '@nestjs/swagger';
import { CreateMaintenanceRequestDto } from './create-maintenance_request.dto';

export class UpdateMaintenanceRequestDto extends PartialType(CreateMaintenanceRequestDto) {}
