import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';

@Entity('locations')
export class Location extends BaseModelEntity {
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Block number of the location', example: 'B57' })
  blockNumber: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Number of floors in the location', example: 5 })
  numberOfFloors: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Latitude of the location', required: false })
  latitude: number | null;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ description: 'Longitude of the location', required: false })
  longitude: number | null;
}
