import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ description: 'JWT refresh token with longer time frame' })
  refreshToken: string;
  
  @ApiProperty({ description: 'User information' })
  user: User;
}
