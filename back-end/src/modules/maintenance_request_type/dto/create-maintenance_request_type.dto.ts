import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMaintenanceRequestTypeDto {
  @ApiProperty({ description: 'The name of the maintenance request type.' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The description of the maintenance request type.', required: false })
  @IsOptional()
  description?: string;
}
