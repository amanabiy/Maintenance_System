import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { PaymentStatus } from '../entities/payment_status.enum';

export class CreatePaymentDto {
  @ApiProperty({ description: 'The amount to be paid', example: 100.0 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'The reason for the payment', example: 'Maintenance request fee' })
  @IsNotEmpty()
  @IsString()
  reason: string;

  @ApiProperty({ description: 'How to pay information', example: 'Credit Card' })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @ApiProperty({ enum: PaymentStatus, description: 'The status of the payment', example: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ description: 'Any additional information about the payment', example: 'Payment was made in two installments' })
  @IsString()
  @IsOptional()
  additionalInfo: string;

  @ApiProperty({ description: 'ID of the user making the payment', example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID of the request related to the payment', example: 1 })
  @IsOptional()
  requestId?: number;

  @ApiProperty({ description: 'The ID of the receipt media file', example: 1 })
  @IsOptional()
  @IsNumber()
  receiptId?: number;
//   @ApiProperty({ description: 'ID of the equipment related to the payment', example: 1 })
//   @IsOptional()
//   equipmentId?: number;
}