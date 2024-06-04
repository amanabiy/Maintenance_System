import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role]), RoleModule],
  controllers: [PermissionController],
  providers: [PermissionService, RoleService],
  exports: [PermissionService]
})
export class PermissionModule {}
