import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusTypeService } from './request_status_type.service';
import { RequestStatusTypeController } from './request_status_type.controller';
import { RequestStatusType } from './entities/request_status_type.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatusType]),
    TypeOrmModule.forFeature([Role])],
  controllers: [RequestStatusTypeController],
  providers: [RequestStatusTypeService, RoleService],
  exports: [RequestStatusTypeService],
})
export class RequestStatusTypeModule {}
