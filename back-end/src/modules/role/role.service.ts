import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { GenericDAL } from 'src/DAL/dal';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService extends GenericDAL<
  Role,
  CreateRoleDto,
  UpdateRoleDto
> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly permissionService: PermissionService,
  ) {
    super(roleRepository, 1, 10, ['permissions']);
  }
  
  async findByName(roleName: string): Promise<Role> {
    return await this.findOne(-1, { where: { roleName } });
  }

  async addPermissionToRole(roleId: number, permissionId: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id: roleId }, relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    const permission = await this.permissionService.findOne(permissionId);
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${permissionId} not found`);
    }
    role.permissions.push(permission);
    return this.roleRepository.save(role);
  }

  async removePermissionFromRole(roleId: number, permissionId: number): Promise<Role> {
    const role = await super.findOne(roleId);
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    role.permissions = role.permissions.filter(permission => permission.id !== permissionId);
    return await this.roleRepository.save(role);
  }
}
