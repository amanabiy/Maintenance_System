import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MaintenanceRequestTypeService } from './maintenance_request_type.service';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { CreateMaintenanceRequestTypeDto } from './dto/create-maintenance_request_type.dto';
import { MaintenanceRequestType } from './entities/maintenance_request_type.entity';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { FindAllResponseMaintenanceRequestTypeDto } from './dto/find-all-response-maintenance_request_type.dto';
import { UpdateMaintenanceRequestTypeDto } from './dto/update-maintenance_request_type.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';

@ApiTags('maintenance-request-types')
@Controller('maintenance-request-types')
export class MaintenanceRequestTypeController {
  constructor(private readonly maintenanceRequestTypeService: MaintenanceRequestTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new maintenance request type' })
  @ApiResponse({ status: 201, description: 'The maintenance request type has been successfully created', type: MaintenanceRequestType })
  @ApiBadRequestResponse({ description: 'Invalid data provided for maintenance request type creation' })
  async create(@Body() createMaintenanceRequestTypeDto: CreateMaintenanceRequestTypeDto): Promise<MaintenanceRequestType> {
    return await this.maintenanceRequestTypeService.create(createMaintenanceRequestTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all maintenance request types' })
  @ApiResponse({ status: 200, description: 'Retrieved all maintenance request types successfully', type: FindAllResponseMaintenanceRequestTypeDto })
  async findAll(): Promise<FindAllResponseDto<MaintenanceRequestType>> {
    return await this.maintenanceRequestTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get maintenance request type by ID' })
  @ApiResponse({ status: 200, description: 'Retrieved maintenance request type successfully', type: MaintenanceRequestType })
  @ApiNotFoundResponse({ description: 'Maintenance request type with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<MaintenanceRequestType> {
    return await this.maintenanceRequestTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update maintenance request type by ID' })
  @ApiResponse({ status: 200, description: 'Maintenance request type has been successfully updated', type: MaintenanceRequestType })
  @ApiNotFoundResponse({ description: 'Maintenance request type with the specified ID not found' })
  async update(@Param('id') id: string, @Body() updateMaintenanceRequestTypeDto: UpdateMaintenanceRequestTypeDto): Promise<MaintenanceRequestType> {
    return await this.maintenanceRequestTypeService.update(+id, updateMaintenanceRequestTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete maintenance request type by ID' })
  @ApiResponse({ status: 200, description: 'Maintenance request type has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Maintenance request type with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.maintenanceRequestTypeService.delete(+id);
    return new DeleteResponseDto();
  }
}
