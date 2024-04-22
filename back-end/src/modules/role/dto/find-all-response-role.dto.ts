import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import FindAllResponseDto from 'src/dto/find-all-response.dto';

export class FindAllResponseRoleDto extends FindAllResponseDto<Role> {
  constructor(page: number, limit: number, total: number, items: Role[]) {
    super(page, limit, total, items);
  }

  @ApiProperty({
    description: 'Array of roles',
    type: () => Role,
    isArray: true,
  })
  items: Role[];
}
