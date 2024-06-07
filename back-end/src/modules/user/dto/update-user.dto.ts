import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsInt, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
    description: 'ID of the media representing the user avatar',
    required: false,
    })
    @IsInt()
    @IsOptional()
    avatarId: number;
}
