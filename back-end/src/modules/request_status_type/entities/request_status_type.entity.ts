import { Entity, Column, OneToMany, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { RequestStatus } from 'src/modules/request_status/entities/request_status.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity('request_status_type')
export class RequestStatusType extends BaseModelEntity {
  @ApiProperty({
    description: 'The name of the request status type',
    example: 'Pending Approval'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of the request status type',
    example: 'The request is pending approval from the manager.'
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'This status is the one that is automatically attached when a request is created',
    example: true
  })
  @Column({ default: false })
  isInitialStatus: boolean;

  @ApiProperty({
    description: 'Indicates if it has a schedule',
    example: false
  })
  @Column({ default: false })
  hasSchedule: boolean;

  @ApiProperty({
    description: 'Indicates if it needs a file/document',
    example: true
  })
  @Column({ default: false })
  needsFile: boolean;

  @ApiProperty({
    description: 'Indicates if it needs signatures',
    example: true
  })
  @Column({ default: false })
  needsSignatures: boolean;

  @ApiProperty({
    description: 'Indicates if it is internal only',
    example: false
  })
  @Column({ default: false })
  isInternal: boolean;

  @ApiProperty({
    description: 'Next possible status options',
    type: [RequestStatusType],
    example: [{ id: 2, name: 'Approved' }, { id: 3, name: 'Rejected' }]
  })
  @ManyToMany(() => RequestStatusType, { cascade: ['remove'] })
  @JoinTable({
    name: 'request_status_type_next_options',
    joinColumn: { name: 'request_status_type_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'next_status_type_id', referencedColumnName: 'id' }
  })
  allowedTransitions: RequestStatusType[];

  @ApiProperty({
    description: 'Indicates if it allows changing the priority of the request',
    example: true
  })
  @Column({ default: false })
  allowChangePriority: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the confirmationStatus of the request (will also allow to update rating, and feedback)',
    example: true
  })
  @Column({ default: false })
  allowChangeconfirmationStatus: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the verificationStatus of the request (will also automatically update verifiedBy, and verifiedAt)',
    example: true
  })
  @Column({ default: false })
  allowChangeverificationStatus: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the request types of the request',
    example: false
  })
  @Column({ default: false })
  allowsChangeRequestTypes: boolean;

  @ApiProperty({
    description: 'Indicates if it allows forwarding to a department',
    example: true
  })
  @Column({ default: false })
  allowsForwardToDepartment: boolean;

  @ApiProperty({
    description: 'Indicates if it allows forwarding to a person',
    example: true
  })
  @Column({ default: false })
  allowsForwardToPerson: boolean;


  @ApiProperty({
    description: 'Indicates if it allows changing the location of the request',
    example: true
  })
  @Column({ default: false })
  allowsChangeLocation: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the title and description of the request',
    example: true
  })
  @Column({ default: false })
  allowsChangeTitleAndDescription: boolean;

  @ApiProperty({
    description: 'Indicates if it allows changing the media files of the request',
    example: true
  })
  @Column({ default: false })
  allowsChangeMedia: boolean;

  @ApiProperty({
    description: 'Indicates if it allows adding more media files to the request',
    example: true
  })
  @Column({ default: false })
  allowsAddMoreMedia: boolean;

  @ApiProperty({
    description: 'The roles that are allowed to access and expected to update this status',
  })
  @ManyToMany(() => Role, { cascade: ['remove'], eager: true })
  @JoinTable({
    name: 'request_status_type_allowed_roles',
    joinColumn: { name: 'request_status_type_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
  })
  allowedRoles: Role[];

  @OneToMany(() => RequestStatus, requestStatus => requestStatus.statusType)
  requestStatuses: RequestStatus[];

  @DeleteDateColumn()
  deletedAt: Date;
}