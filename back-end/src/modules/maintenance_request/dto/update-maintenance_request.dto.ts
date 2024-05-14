import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMaintenanceRequestDto } from './create-maintenance_request.dto';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, Min, Max, IsString, IsDate, IsArray, IsInt } from 'class-validator';
import { MaintenanceConfirmationStatusEnum, MaintenanceVerificationStatusEnum } from '../entities/maintenance_request.enum';

export class UpdateMaintenanceRequestDto extends PartialType(CreateMaintenanceRequestDto) {
  @ApiProperty({ description: 'The subject of the maintenance request' })
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ description: 'The description of the maintenance request (Markdown)' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'The location ID of the maintenance request' })
  @IsNotEmpty()
  @IsNumber()
  locationId: number;

  @ApiProperty({ enum: MaintenanceVerificationStatusEnum, description: 'The verification status of the maintenance request' })
  @IsOptional()
  @IsEnum(MaintenanceVerificationStatusEnum)
  verificationStatus: MaintenanceVerificationStatusEnum;

  @ApiProperty({ enum: MaintenanceConfirmationStatusEnum, description: 'The confirmation status of the maintenance request' })
  @IsOptional()
  @IsEnum(MaintenanceConfirmationStatusEnum)
  confirmationStatus: MaintenanceConfirmationStatusEnum;

  @ApiProperty({ description: 'The rating given to the maintenance request' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'The feedback for the maintenance request' })
  @IsOptional()
  @IsString()
  feedback: string;

  @ApiProperty({ description: 'The IDs of users assigned to handle the maintenance request' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  assignedPersonIds: number[];

  @ApiProperty({ description: 'The IDs of maintenance request types associated with this request' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  maintenanceRequestTypeIds: number[];

  @ApiProperty({ description: 'The ID of the department assigned to handle the maintenance request' })
  @IsOptional()
  @IsInt()
  handlingDepartmentId: number;

  @ApiProperty({ description: 'The IDs of media files associated with this maintenance request' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  mediaIds: number[];
}
