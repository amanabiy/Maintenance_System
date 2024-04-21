import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity()
export class MaintenanceRequestType extends BaseModelEntity {
  @ApiProperty({ description: 'The name of the maintenance request type.' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'The description of the maintenance request type.', required: false })
  @Column({ nullable: true })
  description: string;
}
