import { IsOptional, IsArray, IsNumber, ArrayNotEmpty, IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MaintenanceConfirmationStatusEnum, MaintenanceVerificationStatusEnum } from '../entities/maintenance_request.enum';

export class SearchMaintenanceRequestDto {
  @ApiProperty({ description: 'List of assigned person IDs', required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  assignedPersonIds?: number[];

  @ApiProperty({ description: 'List of maintenance request type IDs', required: false, type: [Number] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  maintenanceRequestTypeIds?: number[];

  @ApiProperty({ description: 'ID of the handling department', required: false })
  @IsOptional()
  @IsNumber()
  handlingDepartmentId?: number;

  @ApiProperty({ description: 'ID of the requester', required: false })
  @IsOptional()
  @IsNumber()
  requesterId?: number;

  @ApiProperty({ enum: MaintenanceConfirmationStatusEnum, description: 'Confirmation status of the maintenance request', required: false })
  @IsOptional()
  @IsEnum(MaintenanceConfirmationStatusEnum)
  confirmationStatus?: MaintenanceConfirmationStatusEnum;

  @ApiProperty({ enum: MaintenanceVerificationStatusEnum, description: 'Verification status of the maintenance request', required: false })
  @IsOptional()
  @IsEnum(MaintenanceVerificationStatusEnum)
  verificationStatus?: MaintenanceVerificationStatusEnum;

  @ApiProperty({ description: 'ID of the user who verified the request', required: false })
  @IsOptional()
  @IsNumber()
  verifiedById?: number;

  @ApiProperty({
    description: 'The priority of the request',
    example: -1,
    default: -1,
  })
  @IsOptional()
  @IsInt()
  priority?: number;
}
