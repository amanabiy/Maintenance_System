import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guards/roles-guard';
import { RoleModule } from './modules/role/role.module';
import { DepartmentModule } from './modules/department/department.module';
import { LocationModule } from './modules/location/location.module';
import { MaintenanceRequestTypeModule } from './modules/maintenance_request_type/maintenance_request_type.module';
import { MaintenanceRequestModule } from './modules/maintenance_request/maintenance_request.module';
import { MailModule } from './modules/mail/mail.module';
import { MediaModule } from './modules/media/media.module';
import { RequestStatusModule } from './modules/request_status/request_status.module';
import { RequestStatusTypeModule } from './modules/request_status_type/request_status_type.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MaintenanceEquipmentModule } from './modules/maintenance_equipment/maintenance_equipment.module';
import { PermissionModule } from './modules/permission/permission.module';
import { Permission } from './modules/permission/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Permission]),
    UserModule,
    AuthModule,
    RoleModule,
    DepartmentModule,
    LocationModule,
    MaintenanceRequestTypeModule,
    MaintenanceRequestModule,
    MailModule,
    MediaModule,
    RequestStatusModule,
    RequestStatusTypeModule,
    PaymentModule,
    MaintenanceEquipmentModule,
    PermissionModule
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
