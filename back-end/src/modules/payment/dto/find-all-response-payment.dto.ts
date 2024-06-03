import { ApiProperty } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { Payment } from '../entities/payment.entity';

export class FindAllResponsePaymentDto extends FindAllResponseDto<Payment> {
  constructor(page: number, limit: number, total: number, items: Payment[]) {
    super(page, limit, total, items);
  }
  @ApiProperty({
    description: 'Array of Payment',
    type: () => Payment,
    isArray: true,
  })
  items: Payment[];
}
