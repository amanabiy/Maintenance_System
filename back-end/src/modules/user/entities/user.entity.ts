import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { BaseModelEntity } from '../../BaseEntity/base-model.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';

@Entity('users')
export class User extends BaseModelEntity {
  // @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  // @ApiProperty({
  //   description: 'Role of the user',
  //   enum: UserRole,
  //   default: UserRole.USER,
  // })
  // role: UserRole;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  @ApiProperty({ description: 'Role ID of the user' })
  role: Role;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email address of the user',
    required: true,
    format: 'email',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'Full name of the user',
    required: true,
  })
  fullName: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => Department, { eager: true }) 
  @JoinColumn({ name: 'department_id' })
  @ApiProperty({ description: 'Department ID of the user' })
  department: Department;

  @Column({ default: false })
  @ApiProperty({
    description: 'Indicates if the user has verified their email',
    default: false,
  })
  isVerified: boolean;

  @Column({ nullable: true, default: '' })
  @Exclude()
  OTP: string;

  @Column({ nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  OTPExpiry: Date;

  @Column({
    name: 'last_password_updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({
    description: 'Timestamp when the password was last updated',
    type: Date,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastPasswordUpdatedAt: Date;

  // @ApiProperty({ description: 'Maintenance requests assigned to the user' })
  // @ManyToMany(() => MaintenanceRequest, { lazy: true})
  // @JoinTable()
  // assignedMaintenanceRequests: Promise<MaintenanceRequest[]>;
}
