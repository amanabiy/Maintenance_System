import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { RequestStatusType } from 'src/modules/request_status_type/entities/request_status_type.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('request_status_time')
export class RequestStatusTime extends BaseModelEntity {
  @ApiProperty({ description: 'The status type from which the transition started', type: () => RequestStatusType })
  @ManyToOne(() => RequestStatusType)
  @JoinColumn({ name: 'from_status_type_id' })
  fromStatusType: RequestStatusType;

  @ApiProperty({ description: 'The status type to which the transition ended', type: () => RequestStatusType })
  @ManyToOne(() => RequestStatusType)
  @JoinColumn({ name: 'to_status_type_id' })
  toStatusType: RequestStatusType;

  @ApiProperty({ description: 'The time spent in the status type in milliseconds', example: 3600000 })
  @IsNotEmpty()
  @IsNumber()
  @Column('bigint')
  timeSpent: number; // time in milliseconds

  @ApiProperty({ description: 'The maintenance request associated with the status time', type: () => MaintenanceRequest })
  @ManyToOne(() => MaintenanceRequest)
  @JoinColumn({ name: 'request_id' })
  request: MaintenanceRequest;

  @ApiProperty({ description: 'The user who processed the status transition', type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'processed_by' })
  processedBy: User;
}