import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { RequestStatus } from 'src/modules/request_status/entities/request_status.entity';

@Entity('request_status_type')
export class RequestStatusType extends BaseModelEntity {
  @ApiProperty({ description: 'The name of the request status type' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Indicates if it has a schedule' })
  @Column({ default: false })
  hasSchedule: boolean;

  @ApiProperty({ description: 'Indicates if it needs a file/document' })
  @Column({ default: false })
  needsFile: boolean;

  @ApiProperty({ description: 'Indicates if it needs signatures' })
  @Column({ default: false })
  needsSignatures: boolean;

  @ApiProperty({ description: 'Indicates if it is internal only' })
  @Column({ default: false })
  isInternal: boolean;

  @ApiProperty({ description: 'Next possible status options', type: [RequestStatusType] })
  @ManyToMany(() => RequestStatusType, { cascade: ['remove'] })
  @JoinTable({
    name: 'request_status_type_next_options',
    joinColumn: { name: 'request_status_type_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'next_status_type_id', referencedColumnName: 'id' }
  })
  allowedTransitions: RequestStatusType[];

  @ApiProperty({ description: 'Indicates if it requires forwarding to a department' })
  @Column({ default: false })
  requiresForwardToDepartment: boolean;

  @ApiProperty({ description: 'Indicates if it requires forwarding to a person' })
  @Column({ default: false })
  requiresForwardToPerson: boolean;

  @OneToMany(() => RequestStatus, requestStatus => requestStatus.statusType)
  requestStatuses: RequestStatus[];
}
