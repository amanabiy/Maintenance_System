import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseModelEntity {
  // @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn()
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

  constructor() {
    this.id = this.generateRandomNumberFromUUID();
    console.log(this.id);
  }

  // Function to generate a random number from UUID
  private generateRandomNumberFromUUID(): number {
    const uuid = uuidv4();
    // Convert the UUID to a number
    const number = parseInt(uuid.replace(/-/g, ''), 16);
    return number;
  }
}
