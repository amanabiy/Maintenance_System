import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ description: 'Name of the department', example: 'Sanitary Department' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
