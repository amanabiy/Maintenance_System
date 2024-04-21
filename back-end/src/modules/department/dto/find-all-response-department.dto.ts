import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { Department } from '../entities/department.entity';

export class FindAllResponseDepartmentDto extends FindAllResponseDto<Department> {
  constructor(page: number, limit: number, total: number, items: Department[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of department',
    type: () => Department,
    isArray: true,
  })
  items: Department[];
}
