import { Injectable } from '@nestjs/common';
import { GenericDAL } from 'src/DAL/dal';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PermissionService extends GenericDAL<
  Permission,
  CreatePermissionDto,
  UpdatePermissionDto
> {
  constructor(
    @InjectRepository(Permission)
    private readonly PermissionRepository: Repository<Permission>,
  ) {
    super(PermissionRepository);
  }

  hasPermission(user: User, permission: string): boolean {
    return user.role.permissions.some(p => p.name === permission);
  }
}
