import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { NotificationTypeEnum } from '../entities/notification.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';

export class CreateNotificationDto {
  @ApiProperty({ enum: NotificationTypeEnum, description: 'The type of notification', example: NotificationTypeEnum.REQUEST_UPDATE })
  @IsNotEmpty()
  @IsEnum(NotificationTypeEnum)
  type: NotificationTypeEnum;

  @ApiProperty({ description: 'The subject of the notification', example: 'Maintenance Request Update' })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({ description: 'The message of the notification', example: 'Your maintenance request has been updated.' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiProperty({ description: 'Indicates if the notification has been read', example: false })
  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @ApiProperty({ description: 'The ID of the user this notification is for', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'The ID of the maintenance request this notification relates to', example: 1, required: false })
  @IsOptional()
  @IsNumber()
  maintenanceRequestId?: number;
}