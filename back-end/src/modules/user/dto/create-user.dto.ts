import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user-role.enum';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email address of the user',
    required: true,
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    required: true,
  })
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for the user account',
    required: true,
    minLength: 6,
  })
  password: string;

  // @IsEnum(UserRoleEnum)
  // @ApiProperty({
  //   description: 'Role of the user',
  //   required: false,
  //   enum: UserRoleEnum,
  //   default: UserRoleEnum.USER,
  //   enumName: 'UserRoleEnum',
  // })
  // role: UserRoleEnum;


  @ApiProperty({ description: 'ID of the department' })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  departmentId: number;

  @ApiProperty({ description: 'ID of the role' })
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  roleId: number;
  /**
   * Date when the user's password was last updated.
   * This field is optional and may not be included in the request.
   * Example: "2024-04-15T08:00:00.000Z"
   */
  @IsOptional()
  lastPasswordUpdatedAt?: Date;
}
