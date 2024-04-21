import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the user' })
  id: number;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Email address of the user',
    required: true,
    format: 'email',
  })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    description: 'Date and time when the user account was created',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({
    description: 'Date and time when the user account was last updated',
  })
  updatedAt: Date;

  @Column({
    name: 'last_password_updated_at',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastPasswordUpdatedAt: Date;
}
