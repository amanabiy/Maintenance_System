import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { FindAllResponseRoleDto } from './dto/find-all-response-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The role has been successfully created', type: Role })
  @ApiBadRequestResponse({ description: 'Invalid data provided for role creation' })
  async create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return await this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all roles' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all roles successfully', type: FindAllResponseRoleDto, isArray: true })
  async findAll(): Promise<FindAllResponseDto<Role>> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a role by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved role successfully', type: Role })
  @ApiNotFoundResponse({ description: 'Role with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<Role> {
    return await this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role has been successfully updated', type: Role })
  @ApiNotFoundResponse({ description: 'Role with the specified ID not found' })
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto): Promise<Role> {
    return await this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Role has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Role with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.roleService.delete(+id);
    return new DeleteResponseDto();
  }
}
