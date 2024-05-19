import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsOptional, IsNumber, Min, Max, IsString, IsDate, IsArray, IsInt } from 'class-validator';
import { MaintenanceVerificationStatusEnum, MaintenanceConfirmationStatusEnum } from '../entities/maintenance_request.enum';
import { CreateLocationDto } from 'src/modules/location/dto/create-location.dto';

export class CreateMaintenanceRequestDto {
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
  locationCreate: CreateLocationDto;

  @ApiProperty({ description: 'The IDs of maintenance request types associated with this request' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  maintenanceRequestTypeIds: number[];

  @ApiProperty({ description: 'The IDs of media files associated with this maintenance request' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  mediaIds: number[];

  @ApiProperty({
    description: 'The priority of the request, by default it is -1',
    example: -1,
    default: -1,
  })
  @IsInt()
  @IsOptional()
  priority: number;
}
