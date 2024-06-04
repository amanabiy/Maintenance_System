import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

export enum NotificationTypeEnum {
    REQUEST_UPDATE = 'REQUEST_UPDATE',
    PAYMENT_STATUS = 'PAYMENT_STATUS',
    GENERAL_NOTIFICATION = 'GENERAL_NOTIFICATION',
}

@Entity('notifications')
export class Notification extends BaseModelEntity {
@ApiProperty({ enum: NotificationTypeEnum, description: 'The type of notification', example: NotificationTypeEnum.REQUEST_UPDATE })
@IsNotEmpty()
@IsEnum(NotificationTypeEnum)
@Column({ type: 'enum', enum: NotificationTypeEnum })
type: NotificationTypeEnum;

  @ApiProperty({ description: 'The subject of the notification', example: 'Maintenance Request Update' })
  @IsNotEmpty()
  @IsString()
  @Column()
  subject: string;

  @ApiProperty({ description: 'The message of the notification', example: 'Your maintenance request has been updated.' })
  @IsNotEmpty()
  @IsString()
  @Column()
  message: string;

  @ApiProperty({ description: 'Indicates if the notification has been read', example: false })
  @IsBoolean()
  @Column({ default: false })
  isRead: boolean;

  @ApiProperty({ description: 'The user this notification is for' })
  @ManyToOne(() => User )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({ description: 'The maintenance request this notification relates to', nullable: true })
  @ManyToOne(() => MaintenanceRequest, { nullable: true, eager: true })
  @JoinColumn({ name: 'request_id' })
  maintenanceRequest: MaintenanceRequest;
}