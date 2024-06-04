import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from 'src/modules/role/entities/role.entity';

export class CreateRequestStatusTypeDto {
  @ApiProperty({
    description: 'The name of the request status type',
    example: 'Pending Approval'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the request status type',
    example: 'The request is pending approval from the manager.'
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Indicates if it has a schedule',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  hasSchedule: boolean;

  @ApiProperty({
    description: 'Indicates if it needs a file/document',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  needsFile: boolean;

  @ApiProperty({
    description: 'Indicates if it needs signatures',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  needsSignatures: boolean;

  @ApiProperty({
    description: 'Indicates if it is internal only',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  isInternal: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the priority of the request',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  allowChangePriority: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the confirmationStatus of the request (will also allow to update rating, and feedback)',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowChangeconfirmationStatus: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the verificationStatus of the request (will also automatically update verifiedBy, and verifiedAt)',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  allowChangeverificationStatus: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the request types of the request',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsChangeRequestTypes: boolean;

  @ApiProperty({
    description: 'Indicates if it allows forwarding to a department',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsForwardToDepartment: boolean;

  @ApiProperty({
    description: 'Indicates if it allows forwarding to a person',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsForwardToPerson: boolean;

  @ApiProperty({
    description: 'Next possible status options',
    type: [Number],
    example: [2, 3]
  })
  @IsArray()
  @Type(() => Number)
  @IsOptional()
  allowedTransitions: number[];


  @ApiProperty({
    description: 'Indicates if it allows changing the location of the request',
    example: false
  })
  allowsChangeLocation: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the title and description of the request',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsChangeTitleAndDescription: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the media files of the request',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsChangeMedia: boolean;

  @ApiProperty({
    description: 'Indicates if it allows adding more media files to the request',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  allowsAddMoreMedia: boolean;

  @ApiProperty({
    description: 'The roles that are allowed to access and expected to update this status',
    type: [Number],
    example: [1, 2]
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  allowedRolesIds: number[];
}