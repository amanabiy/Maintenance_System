import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { FindAllResponseDepartmentDto } from './dto/find-all-response-department.dto';

@ApiTags('Department')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new department' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The department has been successfully created', type: Department })
  @ApiBadRequestResponse({ description: 'Invalid data provided for department creation' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return await this.departmentService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all departments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all departments successfully', type: FindAllResponseDepartmentDto, isArray: true })
  async findAll(): Promise<FindAllResponseDepartmentDto> {
    return await this.departmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a department by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved department successfully', type: Department })
  @ApiNotFoundResponse({ description: 'Department with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<Department> {
    return await this.departmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a department by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Department has been successfully updated', type: Department })
  @ApiNotFoundResponse({ description: 'Department with the specified ID not found' })
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    return await this.departmentService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a department by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Department has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Department with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.departmentService.delete(+id);
    return new DeleteResponseDto();
  }
}
