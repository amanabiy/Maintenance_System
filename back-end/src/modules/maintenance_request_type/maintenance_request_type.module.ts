import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequestTypeService } from './maintenance_request_type.service';
import { MaintenanceRequestTypeController } from './maintenance_request_type.controller';
import { MaintenanceRequestType } from './entities/maintenance_request_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceRequestType])],
  controllers: [MaintenanceRequestTypeController],
  providers: [MaintenanceRequestTypeService],
})
export class MaintenanceRequestTypeModule {}
