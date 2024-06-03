import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { UserService } from '../user/user.service';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { User } from '../user/entities/user.entity';
import { Department } from '../department/entities/department.entity';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { MailService } from '../mail/mailer.service';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { LocationService } from '../location/location.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { MediaService } from '../media/media.service';
import { RequestStatusService } from '../request_status/request_status.service';
import { RequestStatusType } from '../request_status_type/entities/request_status_type.entity';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { Role } from '../role/entities/role.entity';
import { Location } from '../location/entities/location.entity';
import { MaintenanceRequestType } from '../maintenance_request_type/entities/maintenance_request_type.entity';
import { Media } from '../media/entities/media.entity';
import { RequestStatus } from '../request_status/entities/request_status.entity';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';
import { RequestStatusTimeModule } from '../request_status_time/request_status_time.module';
import { RequestStatusTimeService } from '../request_status_time/request_status_time.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, User, MaintenanceRequest, Department, Role, Location,
              MaintenanceRequestType, Media, RequestStatus, RequestStatusType, Permission, RequestStatusTime]), RequestStatusTimeModule],
  providers: [PaymentService, UserService, MaintenanceRequestService, DepartmentService, RoleService,
              MailService, LocationService, MaintenanceRequestTypeService, MediaService, RequestStatusService,
              RequestStatusTypeService, PermissionService, RequestStatusTimeService],
  controllers: [PaymentController],
  exports: [PaymentService]
})
export class PaymentModule {}