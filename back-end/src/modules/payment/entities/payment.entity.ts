import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { PaymentStatus } from './payment_status.enum';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';



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

  @ApiProperty({ enum: PaymentStatus, description: 'The status of the payment', example: PaymentStatus.PENDING })
  @IsEnum(PaymentStatus)
  @Column()
  status: PaymentStatus;

  @ApiProperty({ description: 'Any additional information about the payment', example: 'Payment was made in two installments' })
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  additionalInfo: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => MaintenanceRequest, { nullable: true, eager: true })
  @JoinColumn({ name: 'request_id' })
  request: MaintenanceRequest;

//   @ManyToOne(() => Equipment, { nullable: true, eager: true })
//   @JoinColumn({ name: 'equipment_id' })
//   equipment: Equipment;
}