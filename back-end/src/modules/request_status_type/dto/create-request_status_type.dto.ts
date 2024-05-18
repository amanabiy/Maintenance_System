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

  @ApiProperty({ description: 'Indicates if it allows changing the priority of the request' })
  @IsBoolean()
  @IsOptional()
  allowChangePriority: boolean;

  @ApiProperty({ description: 'Indicates if it allows changing the confirmationStatus of the request (will also allow to update rating, and feedback)' })
  @IsBoolean()
  @IsOptional()
  allowChangeconfirmationStatus: boolean;

  @ApiProperty({ description: 'Indicates if it allows changing the verificationStatus of the request (will also automatically update verfiedBy, and verifiedAt)' })
  @IsBoolean()
  @IsOptional()
  allowChangeverificationStatus: boolean;

  @ApiProperty({ description: 'Indicates if it allows changing the request types of the request' })
  @IsBoolean()
  @IsOptional()
  allowsChangeRequestTypes: boolean;

  @ApiProperty({ description: 'Indicates if it allows forwarding to a department' })
  @IsBoolean()
  @IsOptional()
  allowsForwardToDepartment: boolean;

  @ApiProperty({ description: 'Indicates if it allows forwarding to a person' })
  @IsBoolean()
  @IsOptional()
  allowsForwardToPerson: boolean;

  @ApiProperty({ description: 'Next possible status options', type: [Number] })
  @IsArray()
  @Type(() => Number)
  @IsOptional()
  allowedTransitions: number[];
}
