import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity('permissions')
export class Permission extends BaseModelEntity {
  @ApiProperty({ description: 'The name of the permission', example: 'CAN_REQUEST_PAYMENTS' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'Description of the permission what it allows', example: 'Allows roles with this permission to be able to request payments to be made' })
  @Column({ default: "" })
  description: string;
}