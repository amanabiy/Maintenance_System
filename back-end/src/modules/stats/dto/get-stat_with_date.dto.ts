import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsOptional, IsEnum } from 'class-validator';

export enum GroupByEnum {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export class GetStatsDto {
  @ApiProperty({ description: 'Start date for the statistics', example: '2024-01-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ description: 'End date for the statistics', example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ description: 'Group by period (DAY, WEEK, MONTH, YEAR)', example: 'MONTH', enum: GroupByEnum })
  @IsOptional()
  @IsEnum(GroupByEnum)
  groupBy?: GroupByEnum;
}