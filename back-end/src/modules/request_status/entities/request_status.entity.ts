import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Media } from 'src/modules/media/entities/media.entity';
import { RequestStatusEnum } from './request_status.enum';
import { RequestStatusType } from 'src/modules/request_status_type/entities/request_status_type.entity';
import { Exclude } from 'class-transformer';

@Entity('request_status')
export class RequestStatus extends BaseModelEntity {
  @ApiProperty({ description: 'The maintenance request ID' })
  @ManyToOne(() => MaintenanceRequest)
  @JoinColumn({ name: 'request_id' })
  request: Promise<MaintenanceRequest>;

  @ApiProperty({ description: 'The request status type' })
  @ManyToOne(() => RequestStatusType, { eager: true })
  @JoinColumn({ name: 'request_status_type_id' })
  statusType: RequestStatusType;

  @ApiProperty({ description: 'The user who updated the status' })
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'status_updated_by' })
  statusUpdatedBy: Promise<User>;

  @ApiProperty({ description: 'Scheduled maintenance start date and time' })
  @Column({ nullable: true })
  scheduleMaintenanceStartDateTime: Date;

  @ApiProperty({ description: 'Scheduled maintenance end date and time' })
  @Column({ nullable: true })
  scheduleMaintenanceEndDateTime: Date;

//   @ApiProperty({ description: 'View only internal' })
//   @Column({ default: false })
//   viewOnlyInternal: boolean;

  @ApiProperty({ description: 'Internal note' })
  @Column({ nullable: true })
  internalNote: string;

  @ApiProperty({ description: 'Internal Version Changes on the maintenance request' })
  @Column({ nullable: true })
  // @Exclude()
  internalVersionChanges: string;

  @ApiProperty({ description: 'External message' })
  @Column({ nullable: true })
  externalNote: string;

  @ApiProperty({ description: 'The media files associated with this request status update' })
  @OneToMany(() => Media, media => media.maintenanceRequests, { eager: true })
  @JoinColumn({ name: 'media_id'})
  mediaFiles: Media[];

  @ApiProperty({ description: 'Name of the person who needs to sign' })
  @Column({ nullable: true })
  signatureByName: string;
}
