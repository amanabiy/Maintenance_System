import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([MaintenanceRequest, Location, User, MaintenanceRequestType,
      Department, Role, Media]),
    LocationModule,
    UserModule,
    DepartmentModule,
    MaintenanceRequestTypeModule
  ],
  controllers: [MaintenanceRequestController],
  providers: [MaintenanceRequestService, LocationService, UserService, DepartmentService,
    MaintenanceRequestTypeService, RoleService, MailService,
    MediaService],
})
export class MaintenanceRequestModule {}
