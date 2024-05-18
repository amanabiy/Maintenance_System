import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { RequestStatus } from '../entities/request_status.entity';

export class FindAllResponseRequestStatusDto extends FindAllResponseDto<RequestStatus> {
  constructor(page: number, limit: number, total: number, items: RequestStatus[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of RequestStatusType',
    type: () => RequestStatus,
    isArray: true,
  })
  items: RequestStatus[];
}
