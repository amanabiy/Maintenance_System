import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsDate, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequestStatusDto {
  @ApiProperty({ description: 'Scheduled maintenance start date and time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduleMaintenanceStartDateTime?: Date;

  @ApiProperty({ description: 'Scheduled maintenance end date and time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduleMaintenanceEndDateTime?: Date;

  @ApiProperty({ description: 'Internal note' })
  @IsOptional()
  @IsString()
  internalNote?: string;

  @ApiProperty({ description: 'Internal Version Changes on the maintenance request' })
  @IsOptional()
  @IsString()
  internalVersionChanges?: string;

  @ApiProperty({ description: 'External message' })
  @IsOptional()
  @IsString()
  externalNote?: string;

  @ApiProperty({ description: 'The media files associated with this request status update', type: [Number] })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  mediaFiles?: number[];

  @ApiProperty({ description: 'Name of the person who needs to sign' })
  @IsOptional()
  @IsString()
  signatureByName?: string;
}
