import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Block number of the location', example: '123A' })
  @IsNotEmpty()
  @IsNumber()
  blockNumber: number;

  @ApiProperty({ description: 'floor number', example: 5 })
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

  @ApiProperty({ description: 'is the location in toilet?', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isToilet?: boolean;
}
