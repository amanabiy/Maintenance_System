import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { Notification } from '../entities/notification.entity';

export class FindAllResponseNotificationDto extends FindAllResponseDto<Notification> {
  constructor(page: number, limit: number, total: number, items: Notification[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of Notification',
    type: () => Notification,
    isArray: true,
  })
  items: Notification[];
}
