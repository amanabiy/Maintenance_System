import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaintenanceRequestModule } from '../maintenance_request/maintenance_request.module'; // Adjust path as needed
import { MaintenanceEquipmentController } from './maintenance_equipment.controller';
import { MaintenanceEquipmentService } from './maintenance_equipment.service';
import { MaintenanceEquipment } from './entities/maintenance_equipment.entity';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { User } from '../user/entities/user.entity';
import { Department } from '../department/entities/department.entity';
import { Role } from '../role/entities/role.entity';
import { MaintenanceRequestType } from '../maintenance_request_type/entities/maintenance_request_type.entity';
import { Media } from '../media/entities/media.entity';
import { RequestStatus } from '../request_status/entities/request_status.entity';
import { RequestStatusType } from '../request_status_type/entities/request_status_type.entity';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { MailService } from '../mail/mailer.service';
import { LocationService } from '../location/location.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { MediaService } from '../media/media.service';
import { RequestStatusService } from '../request_status/request_status.service';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { Location } from '../location/entities/location.entity';
import { PermissionService } from '../permission/permission.service';
import { Permission } from '../permission/entities/permission.entity';
import { RequestStatusTimeService } from '../request_status_time/request_status_time.service';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';

@Module({
  imports: [TypeOrmModule.forFeature([MaintenanceEquipment, User, MaintenanceRequest, Department, Role, Location,
    MaintenanceRequestType, Media, RequestStatus, Permission, RequestStatusType, RequestStatusTime]), NotificationModule],
providers: [MaintenanceEquipmentService, UserService, MaintenanceRequestService, DepartmentService, RoleService,
    MailService, LocationService, MaintenanceRequestTypeService, MediaService, RequestStatusService,
    RequestStatusTypeService, PermissionService, RequestStatusTimeService, ],
controllers: [MaintenanceEquipmentController],
exports: [MaintenanceEquipmentService]
})
export class MaintenanceEquipmentModule {}