import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { RequestStatusType } from '../entities/request_status_type.entity';

export class FindAllResponseRequestStatustypeDto extends FindAllResponseDto<RequestStatusType> {
  constructor(page: number, limit: number, total: number, items: RequestStatusType[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of RequestStatusType',
    type: () => RequestStatusType,
    isArray: true,
  })
  items: RequestStatusType[];
}
