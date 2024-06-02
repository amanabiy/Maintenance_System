import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({ description: 'The name of the permission', example: 'CAN_VIEW_USERS' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the permission', example: 'Allows viewing users' })
  @IsNotEmpty()
  @IsString()
  description: string;
}