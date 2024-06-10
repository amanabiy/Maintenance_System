import { Entity, Column, ManyToMany, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';

@Entity('maintenance_request_type')
export class MaintenanceRequestType extends BaseModelEntity {
  @ApiProperty({ description: 'The name of the maintenance request type.' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'The description of the maintenance request type.', required: false })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Maintenance requests associated with this type' })
  @ManyToMany(() => MaintenanceRequest)
  maintenanceRequests: MaintenanceRequest[];

  @DeleteDateColumn()
  deletedAt: Date;
}
