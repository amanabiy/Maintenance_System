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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT) || 3306,
      username: process.env.MYSQL_USER || 'aman',
      password: process.env.MYSQL_PASSWORD || 'le_shay_buna_amans_20321',
      database: process.env.MYSQL_DATABASE || 'le_shay_buna',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    RoleModule,
    DepartmentModule,
    LocationModule,
    MaintenanceRequestTypeModule,
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
