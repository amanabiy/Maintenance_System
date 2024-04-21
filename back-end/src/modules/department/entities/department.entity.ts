import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity()
export class Department extends BaseModelEntity {
  @Column()
  @ApiProperty({ description: 'The name of the department.' })
  name: string;
}
