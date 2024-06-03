import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentStatus } from '../entities/payment_status.enum';

export class ChangePaymentStatusDto {
  @ApiProperty({ description: 'The status to be changed to and the comment', example: PaymentStatus.REJECTED,
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ description: 'Comment on the receipt', example: 'The receipt is not visible', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}