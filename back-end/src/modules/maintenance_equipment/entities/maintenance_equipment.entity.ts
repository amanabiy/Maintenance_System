import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsEnum,
    IsOptional,
  } from 'class-validator';
  import { BaseModelEntity } from 'src/modules/BaseEntity/base-model.entity';
  import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { EquipmentStatus } from './equipment_status.enum';
  

  
  @Entity('maintenance_equipments')
  export class MaintenanceEquipment extends BaseModelEntity {
    @ApiProperty({ description: 'The name of the equipment', example: 'Laptop' })
    @IsNotEmpty()
    @IsString()
    @Column()
    name: string;
  
    @ApiProperty({ description: 'The model of the equipment', example: 'Dell XPS 15' })
    @IsNotEmpty()
    @IsString()
    @Column()
    model: string;
  
    @ApiProperty({ description: 'The category of the equipment', example: 'Electronics' })
    @IsNotEmpty()
    @IsString()
    @Column()
    category: string;
  
    @ApiProperty({ description: 'The amount of equipment available', example: 10 })
    @IsNotEmpty()
    @IsNumber()
    @Column()
    amount: number;
  
    @ApiProperty({ description: 'The price of the equipment', example: 1500 })
    @IsOptional()
    @IsNumber()
    @Column('decimal', { nullable: true })
    price: number;
  
    @ApiProperty({
      description: 'Any clarification about the equipment',
      example: 'This model comes with a 3-year warranty',
    })
    @IsString()
    @IsOptional()
    @Column({ nullable: true })
    clarification: string;
  
    @ApiProperty({ description: 'The priority of the equipment', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    @Column({ default: 0 })
    priority: number;
  
    @ApiProperty({
      enum: EquipmentStatus,
      description: 'The status of the equipment',
      example: EquipmentStatus.PENDING,
    })
    @IsEnum(EquipmentStatus)
    @Column()
    status: EquipmentStatus;
  
    @ManyToOne(() => MaintenanceRequest, (maintenanceRequest) => maintenanceRequest.equipments )
    @JoinColumn({ name: 'maintenance_request_id' })
    maintenanceRequest: MaintenanceRequest;
  }