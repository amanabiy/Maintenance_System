import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { Department } from '../department/entities/department.entity';
import { Role } from '../role/entities/role.entity';
import { DepartmentModule } from '../department/department.module';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mailer.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';
import { Media } from '../media/entities/media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Permission, Media]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Department]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MailModule,
    SharedModule
  ],
  controllers: [UserController],
  providers: [UserService, DepartmentService, RoleService, MailService, JwtService, PermissionService],
  exports: [UserService],
})
export class UserModule {}
