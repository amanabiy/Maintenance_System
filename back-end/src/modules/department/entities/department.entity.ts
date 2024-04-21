import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity('departments')
export class Department extends BaseModelEntity {
  @Column({unique: true})
  @ApiProperty({ description: 'The name of the department.' })
  name: string;
}
