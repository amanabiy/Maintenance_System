import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { MaintenanceEquipment } from 'src/modules/maintenance_equipment/entities/maintenance_equipment.entity';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { User } from '../user/entities/user.entity';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEquipment, MaintenanceRequest, User, RequestStatusTime])],
  providers: [StatsService],
  controllers: [StatsController],
})
export class StatsModule {}