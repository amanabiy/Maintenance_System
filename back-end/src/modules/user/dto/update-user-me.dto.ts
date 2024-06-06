import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from '../entities/user-role.enum';
import { IsPhoneNumber } from '../validator/is_phone_number.validator';

export class UpdateUserMeDto {
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

  @IsOptional()
  @MinLength(6)
  @ApiProperty({
    description: 'Password for the user account',
    required: true,
    minLength: 6,
  })
  password: string;


  @ApiProperty({
    description: 'Phone number of the user (including country code) format: +251XXXXXXXXX',
    required: true,
  })
  @IsOptional()
  @IsPhoneNumber() // Use the custom decorator
  phoneNumber: string;

  @ApiProperty({
    description: 'ID of the media representing the user avatar',
    required: false,
  })
  @IsInt()
  @IsOptional()
  avatarId: number;
}
