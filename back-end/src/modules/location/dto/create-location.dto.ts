import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Block number of the location', example: 57 })
  @IsNotEmpty()
  @IsNumber()
  blockNumber: number;

  @ApiProperty({ description: 'floor number', example: 2 })
  @IsNotEmpty()
  @IsNumber()
  floor: number;

  @ApiProperty({ description: 'Latitude of the location', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitude of the location', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty({ description: 'Room number', example: '204', required: false })
  @IsOptional()
  @IsString()
  roomNumber?: string;

  @ApiProperty({ description: 'is the location in toilet?', example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isToilet?: boolean;
}
