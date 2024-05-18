import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRequestStatusTypeDto {
  @ApiProperty({ description: 'The name of the request status type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Indicates if it has a schedule' })
  @IsBoolean()
  @IsOptional()
  hasSchedule: boolean;

  @ApiProperty({ description: 'Indicates if it needs a file/document' })
  @IsBoolean()
  @IsOptional()
  needsFile: boolean;

  @ApiProperty({ description: 'Indicates if it needs signatures' })
  @IsBoolean()
  @IsOptional()
  needsSignatures: boolean;

  @ApiProperty({ description: 'Indicates if it is internal only' })
  @IsBoolean()
  @IsOptional()
  isInternal: boolean;

  @ApiProperty({ description: 'Indicates if it requires forwarding to a department' })
  @IsBoolean()
  @IsOptional()
  requiresForwardToDepartment: boolean;

  @ApiProperty({ description: 'Indicates if it requires forwarding to a person' })
  @IsBoolean()
  @IsOptional()
  requiresForwardToPerson: boolean;

  @ApiProperty({ description: 'Next possible status options', type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsOptional()
  allowedTransitions: number[];
}
