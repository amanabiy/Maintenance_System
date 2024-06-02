import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusTypeService } from './request_status_type.service';
import { RequestStatusTypeController } from './request_status_type.controller';
import { RequestStatusType } from './entities/request_status_type.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatusType, Permission]),
    TypeOrmModule.forFeature([Role])],
  controllers: [RequestStatusTypeController],
  providers: [RequestStatusTypeService, RoleService, PermissionService],
  exports: [RequestStatusTypeService],
})
export class RequestStatusTypeModule {}
