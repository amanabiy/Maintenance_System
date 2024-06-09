import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { PaymentStatus } from './payment_status.enum';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { Media } from 'src/modules/media/entities/media.entity';



@Entity('payments')
export class Payment extends BaseModelEntity {
  @ApiProperty({ description: 'The amount to be paid', example: 100.0 })
  @IsNotEmpty()
  @IsNumber()
  @Column('decimal')
  amount: number;

  @ApiProperty({ description: 'The reason for the payment', example: 'Maintenance request fee' })
  @IsNotEmpty()
  @IsString()
  @Column()
  reason: string;

  @ApiProperty({ description: 'How to pay information', example: 'Credit Card' })
  @IsNotEmpty()
  @IsString()
  @Column()
  paymentMethod: string;

  // @ApiProperty({ enum: PaymentStatus, description: 'The status of the payment', example: PaymentStatus.PENDING })
  // @IsEnum(PaymentStatus)
  // @Column()
  // status: PaymentStatus;

  @ApiProperty({ description: 'Any additional information about the payment', example: 'Payment was made in two installments' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  additionalInfo: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => MaintenanceRequest, { nullable: true })
  @JoinColumn({ name: 'request_id' })
  request: MaintenanceRequest;

  @ApiProperty({ description: 'Receipt media file for the payment' })
  @OneToOne(() => Media, { eager: true, nullable: true })
  @JoinColumn({ name: 'receipt_id' })
  receipt: Media;

  @ApiProperty({
    description: 'The approval status of the receipt',
    enum: PaymentStatus,
    example: PaymentStatus.WAITING_PAYMENT,
  })
  @IsEnum(PaymentStatus)
  @Column({ default: PaymentStatus.PENDING })
  receiptApprovalStatus: PaymentStatus;

  @ApiProperty({ description: 'Comment on the receipt', example: 'the receipt is not visible' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  receiptComment: string;

  @ApiProperty({ description: 'The user who approved/rejected the receipt', type: () => User, nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'receipt_approved_by' })
  receiptApprovedBy: User;

//   @ManyToOne(() => Equipment, { nullable: true, eager: true })
//   @JoinColumn({ name: 'equipment_id' })
//   equipment: Equipment;
}