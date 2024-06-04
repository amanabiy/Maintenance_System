import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { Permission } from '../entities/permission.entity';

export class FindAllResponsePermissionDto extends FindAllResponseDto<Permission> {
  constructor(page: number, limit: number, total: number, items: Permission[]) {
    super(page, limit, total, items);
  }


  @ApiProperty({
    description: 'Array of Permissions',
    type: () => Permission,
    isArray: true,
  })
  items: Permission[];
}
