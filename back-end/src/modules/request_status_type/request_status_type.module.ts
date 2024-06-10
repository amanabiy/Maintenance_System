import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusTypeService } from './request_status_type.service';
import { RequestStatusTypeController } from './request_status_type.controller';
import { RequestStatusType } from './entities/request_status_type.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';
import { RequestStatus } from '../request_status/entities/request_status.entity';
import { RequestStatusModule } from '../request_status/request_status.module';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatusType, Permission, RequestStatus, Role]), 
    forwardRef(() => RequestStatusModule)],
  controllers: [RequestStatusTypeController],
  providers: [RequestStatusTypeService, RoleService, PermissionService],
  exports: [RequestStatusTypeService],
})
export class RequestStatusTypeModule {}
