import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity('locations')
export class Location extends BaseModelEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({ description: 'Block number of the location', example: 'B57' })
  blockNumber: number;

  @Column({ type: 'int', nullable : true })
  @ApiProperty({ description: 'floor number', example: 5 })
  floor: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Latitude of the location', required: false })
  latitude: number | null;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Longitude of the location', required: false })
  longitude: number | null;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Room number',
    example: '204',
    required: false,
  })
  roomNumber: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'is the location in toilet?',
    example: true,
    required: false,
  })
  isToilet: boolean;
}
