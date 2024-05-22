import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsDate, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateRequestStatusDto } from './update-request_status.dto';
import { UpdateMaintenanceRequestDto } from 'src/modules/maintenance_request/dto/update-maintenance_request.dto';

export class ChangeRequestStatusDto {
  @ApiProperty({ description: 'Scheduled maintenance start date and time' })
  @IsOptional()
  @Type(() => UpdateMaintenanceRequestDto)
  updateMaintenance?: UpdateMaintenanceRequestDto;

  @ApiProperty({ description: 'Scheduled maintenance end date and time' })
  @IsOptional()
  @Type(() => UpdateRequestStatusDto)
  updateRequestStatus?: UpdateRequestStatusDto;
}
