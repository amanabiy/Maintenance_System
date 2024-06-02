import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { EquipmentStatus } from '../../maintenance_equipment/entities/equipment_status.enum';
import { Exclude } from 'class-transformer';

export class CreateMaintenanceEquipmentDto {
  @ApiProperty({ description: 'The name of the equipment', example: 'Laptop' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The model of the equipment', example: 'Dell XPS 15' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ description: 'The category of the equipment', example: 'Electronics' })
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty({ description: 'The amount of equipment available', example: 10 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The price of the equipment', example: 1500 })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Any clarification about the equipment', example: 'This model must come with the highest quality' })
  @IsString()
  @IsOptional()
  clarification: string;

  @ApiProperty({ description: 'The priority of the equipment', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @ApiProperty({ enum: EquipmentStatus, description: 'The status of the equipment', example: EquipmentStatus.PENDING })
  @IsEnum(EquipmentStatus)
  status: EquipmentStatus;

//   @ApiProperty({ description: 'The ID of the related maintenance request', example: 1 })
  @IsOptional()
  maintenanceRequestId: number;
}