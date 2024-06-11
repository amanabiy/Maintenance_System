import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllResponsePermissionDto } from './dto/find-all-response-permission.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { PermissionsGuard } from './guard/permissions.guard';

@Controller('permission')
@ApiTags('Permission')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@ApiBearerAuth('bearerAuth')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  findAll(): Promise<FindAllResponsePermissionDto> {
    return this.permissionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new permission' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Permission created successfully',
    type: Permission,
  })
  create(@Body() createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.create(createPermissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a permission by ID' })
  @ApiParam({ name: 'id', description: 'Permission ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Permission deleted successfully',
    type: DeleteResponseDto,
  })
  async remove(@Param('id') id: number): Promise<DeleteResponseDto> {
    await this.permissionService.delete(id);
    return new DeleteResponseDto();
  }
}
