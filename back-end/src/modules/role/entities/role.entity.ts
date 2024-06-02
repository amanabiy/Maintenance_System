import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
import { UserRoleEnum } from 'src/modules/user/entities/user-role.enum';
import { Permission } from 'src/modules/permission/entities/permission.entity';

@Entity('roles')
export class Role extends BaseModelEntity {
  @Column({ unique: true })
  @ApiProperty({ description: 'Name of the role', enum: UserRoleEnum, default: 'User' })
  roleName: string;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}
