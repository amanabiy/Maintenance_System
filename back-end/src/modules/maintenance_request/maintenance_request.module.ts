import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequestService } from './maintenance_request.service';
import { MaintenanceRequestController } from './maintenance_request.controller';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { LocationModule } from '../location/location.module';
import { UserModule } from '../user/user.module';
import { DepartmentModule } from '../department/department.module';
import { MaintenanceRequestTypeModule } from '../maintenance_request_type/maintenance_request_type.module';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { User } from '../user/entities/user.entity';
import { MaintenanceRequestType } from '../maintenance_request_type/entities/maintenance_request_type.entity';
import { Location } from '../location/entities/location.entity';
import { RoleService } from '../role/role.service';
import { Department } from '../department/entities/department.entity';
import { Role } from '../role/entities/role.entity';
import { MailService } from '../mail/mailer.service';
import { MediaService } from '../media/media.service';
import { Media } from '../media/entities/media.entity';
import { RequestStatusService } from '../request_status/request_status.service';
import { RequestStatusModule } from '../request_status/request_status.module';
import { RequestStatus } from '../request_status/entities/request_status.entity';
import { RequestStatusType } from '../request_status_type/entities/request_status_type.entity';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entities/permission.entity';
import { RequestStatusTimeService } from '../request_status_time/request_status_time.service';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MaintenanceRequest, Location, User, MaintenanceRequestType,
      Department, Role, Media, RequestStatus, RequestStatusType, Permission, RequestStatusTime]),
    LocationModule,
    UserModule,
    DepartmentModule,
    MaintenanceRequestTypeModule,
    forwardRef(() => RequestStatusModule),
  ],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService, LocationService, UserService, DepartmentService,
    MaintenanceRequestTypeService, RoleService, MailService, RequestStatusService, RequestStatusTypeService,
    MediaService, PermissionService, RequestStatusTimeService],
})
export class MaintenanceRequestModule {}
