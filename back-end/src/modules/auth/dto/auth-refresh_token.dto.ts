import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class AuthRefreshTokenDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;
}
