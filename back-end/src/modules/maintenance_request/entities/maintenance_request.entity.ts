import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsString,
  IsDate,
} from 'class-validator';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { MaintenanceRequestType } from 'src/modules/maintenance_request_type/entities/maintenance_request_type.entity';
import {
  MaintenanceConfirmationStatusEnum,
  MaintenanceVerificationStatusEnum,
} from './maintenance_request.enum';
import { Media } from 'src/modules/media/entities/media.entity';
import { RequestStatus } from 'src/modules/request_status/entities/request_status.entity';

@Entity('maintenance_requests')
export class MaintenanceRequest extends BaseModelEntity {
  @ApiProperty({ description: 'The subject of the maintenance request' })
  @IsNotEmpty()
  @Column()
  subject: string;

  @ApiProperty({ description: 'The description of the maintenance request (Markdown)' })
  @IsNotEmpty()
  @IsString()
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'The location of the maintenance request' })
  @ManyToOne(() => Location, { eager: true, nullable: true })
  location: Location;

  @ApiProperty({ enum: MaintenanceVerificationStatusEnum, description: 'The verification status of the maintenance request' })
  @IsOptional()
  @IsEnum(MaintenanceVerificationStatusEnum)
  @Column({ nullable: true })
  verificationStatus: MaintenanceVerificationStatusEnum;

  @ApiProperty({ description: 'The date and time when the maintenance request was verified' })
  @IsOptional()
  @IsDate()
  @Column({ nullable: true })
  verifiedAt: Date;

  @ApiProperty({ enum: MaintenanceConfirmationStatusEnum, description: 'The confirmation status of the maintenance request' })
  @IsNotEmpty()
  @IsEnum(MaintenanceConfirmationStatusEnum)
  @Column({ nullable: true })
  confirmationStatus: MaintenanceConfirmationStatusEnum;

  @ApiProperty({ description: 'The rating given to the maintenance request' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  @Column({ nullable: true })
  rating: number;

  @ApiProperty({
    description: 'The priority of the request, by default it is -1',
    example: -1,
    default: -1,
  })
  @Column({ default: -1 })
  priority: number;

  @ApiProperty({ description: 'The feedback for the maintenance request' })
  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  feedback: string;

  @ApiProperty({ description: 'The user who requested the maintenance' })
  @ManyToOne(() => User, { eager: true, lazy: true })
  @JoinColumn({ name: 'requester_id' })
  requester: () => User;  

  @ApiProperty({ description: 'The users assigned to handle the maintenance request' })
  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  assignedPersons: User[];

  @ApiProperty({ description: 'Types of maintenance requests associated with this request' })
  @ManyToMany(() => MaintenanceRequestType, { eager: true })
  @JoinTable()
  maintenanceRequestTypes: MaintenanceRequestType[];

  @ApiProperty({ description: 'The department assigned to handle the maintenance request' })
  @ManyToOne(() => Department, { eager: true, nullable: true })
  handlingDepartment: Department;

  @ApiProperty({ description: 'The media files associated with this maintenance request' })
  @OneToMany(() => Media, media => media.maintenanceRequests, { eager: true })
  @JoinColumn({ name: 'media_id'})
  mediaFiles: Media[];

  @ApiProperty({ description: 'The statuses associated with this maintenance request' })
  @OneToMany(() => RequestStatus, requestStatus => requestStatus.request, { eager: true })
  requestStatuses: RequestStatus[];
}

