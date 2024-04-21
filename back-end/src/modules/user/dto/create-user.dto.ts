import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email address of the user',
    required: true,
    format: 'email',
  })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for the user account',
    required: true,
    minLength: 6,
  })
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({
    description: 'Role of the user',
    required: false,
    enum: UserRole,
    default: UserRole.USER,
    enumName: 'UserRoleEnum',
  })
  role: UserRole;

  /**
   * Date when the user's password was last updated.
   * This field is optional and may not be included in the request.
   * Example: "2024-04-15T08:00:00.000Z"
   */
  lastPasswordUpdatedAt?: Date;
}
