import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { User } from 'src/modules/user/entities/user.entity';

export class FindAllResponseUserDto extends FindAllResponseDto<User> {
  constructor(page: number, limit: number, total: number, items: User[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of users',
    type: () => User,
  })
  items: User[];
}
