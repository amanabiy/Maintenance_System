import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { Location } from '../entities/location.entity';

export class FindAllResponseLocationDto extends FindAllResponseDto<Location> {
  constructor(page: number, limit: number, total: number, items: Location[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of Location',
    type: () => Location,
    isArray: true,
  })
  items: Location[];
}
