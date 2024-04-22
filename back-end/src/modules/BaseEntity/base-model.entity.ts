import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({
    description: 'Date and time when it was created',
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({
    description: 'Date and time when it was last updated',
  })
  updatedAt: Date;
}
