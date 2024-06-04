import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { DepartmentService } from '../department/department.service';
import { RoleService } from '../role/role.service';
import { Role } from '../role/entities/role.entity';
import { Department } from '../department/entities/department.entity';
import { MailService } from '../mail/mailer.service';
import { Permission } from '../permission/entities/permission.entity';
import { PermissionService } from '../permission/permission.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '48h' },
    }),
    TypeOrmModule.forFeature([User, Department, Role, Permission]),
  ],
  providers: [AuthService, UserService, JwtStrategy, DepartmentService, RoleService, MailService, PermissionService],
  controllers: [AuthController],
  exports: [JwtModule, AuthModule],
})
export class AuthModule {}
