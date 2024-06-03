import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusService } from './request_status.service';
import { RequestStatusController } from './request_status.controller';
import { RequestStatus } from './entities/request_status.entity';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { UserService } from '../user/user.service';
import { MediaService } from '../media/media.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';
import { RequestStatusType } from '../request_status_type/entities/request_status_type.entity';
import { MaintenanceRequestModule } from '../maintenance_request/maintenance_request.module';
import { UserModule } from '../user/user.module';
import { MaintenanceRequestTypeModule } from '../maintenance_request_type/maintenance_request_type.module';
import { MediaModule } from '../media/media.module';
import { DepartmentModule } from '../department/department.module';
import { RoleModule } from '../role/role.module';
import { Type } from 'class-transformer';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { User } from '../user/entities/user.entity';
import { MaintenanceRequestType } from '../maintenance_request_type/entities/maintenance_request_type.entity';
import { Department } from '../department/entities/department.entity';
import { Role } from '../role/entities/role.entity';
import { Media } from '../media/entities/media.entity';
import { Location } from '../location/entities/location.entity';
import { LocationModule } from '../location/location.module';
import { LocationService } from '../location/location.service';
import { MailService } from '../mail/mailer.service';
import { RequestStatusTypeModule } from '../request_status_type/request_status_type.module';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';
import { RequestStatusTimeService } from '../request_status_time/request_status_time.service';

@Module({
  imports: [
            TypeOrmModule.forFeature([RequestStatus, MaintenanceRequest, User, MaintenanceRequestType,
            Department, Role, Media, RequestStatusType, Location, Permission, RequestStatusTime]),
            forwardRef(() => MaintenanceRequestModule), RequestStatusModule, RequestStatusTypeModule,
            UserModule, MediaModule, RoleModule, MaintenanceRequestTypeModule,
            DepartmentModule, LocationModule
        ],
  controllers: [RequestStatusController],
  providers: [RequestStatusService, RequestStatusTypeService, MaintenanceRequestService,
              UserService, MediaService, RoleService, MaintenanceRequestTypeService, DepartmentService,
              LocationService, MailService, PermissionService, RequestStatusTimeService],
  exports: [RequestStatusService],
})
export class RequestStatusModule {}
