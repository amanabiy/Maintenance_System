import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { UserRoleEnum } from 'src/modules/user/entities/user-role.enum';

@Entity('roles')
export class Role extends BaseModelEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'Name of the role', enum: UserRoleEnum, default: 'User' })
  roleName: string;
}
