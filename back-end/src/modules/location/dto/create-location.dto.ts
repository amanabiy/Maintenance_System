import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({ description: 'Block number of the location', example: '123A' })
  @IsNotEmpty()
  @IsString()
  blockNumber: string;

  @ApiProperty({ description: 'Number of floors in the location', example: 5 })
  @IsNotEmpty()
  @IsNumber()
  numberOfFloors: number;

  @ApiProperty({ description: 'Latitude of the location', required: false })
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty({ description: 'Longitude of the location', required: false })
  @IsOptional()
  @IsNumber()
  longitude?: number;
}
