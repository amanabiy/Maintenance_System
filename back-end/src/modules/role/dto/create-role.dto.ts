import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'The role name' })
  @IsNotEmpty()
  readonly roleName: string;
}