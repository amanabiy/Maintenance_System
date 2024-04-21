import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Query } from '@nestjs/common';
import { MaintenanceRequestService } from './maintenance_request.service';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance_request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance_request.dto';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { FindAllResponseMaintenanceRequestDto } from './dto/find-all-response-maintenance_requestdto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { plainToInstance } from 'class-transformer';

@ApiTags('Maintenance Request')
@Controller('maintenance-request')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearerAuth')
@UseGuards(RolesGuard)
export class MaintenanceRequestController {
  constructor(private readonly maintenanceRequestService: MaintenanceRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new maintenance request' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The maintenance request has been successfully created', type: MaintenanceRequest })
  @ApiBadRequestResponse({ description: 'Invalid data provided for maintenance request creation' })
  async create(
    @Body() createMaintenanceRequestDto: CreateMaintenanceRequestDto,
    @CurrentUser() currentUser: User): Promise<MaintenanceRequest> {
    return plainToInstance(MaintenanceRequest, await this.maintenanceRequestService.createRequest(createMaintenanceRequestDto, currentUser));
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all maintenance requests' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all maintenance requests successfully', type: [MaintenanceRequest] })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 50): Promise<FindAllResponseMaintenanceRequestDto> {
    return await this.maintenanceRequestService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a maintenance request by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved maintenance request successfully', type: MaintenanceRequest })
  @ApiNotFoundResponse({ description: 'Maintenance request with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<MaintenanceRequest> {
    return await this.maintenanceRequestService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a maintenance request by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Maintenance request has been successfully updated', type: MaintenanceRequest })
  @ApiNotFoundResponse({ description: 'Maintenance request with the specified ID not found' })
  async update(@Param('id') id: string,
    @Body() updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
    @CurrentUser() currentUser: User): Promise<MaintenanceRequest> {
    return await this.maintenanceRequestService.updateRequest(+id, updateMaintenanceRequestDto, currentUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a maintenance request by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Maintenance request has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Maintenance request with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.maintenanceRequestService.delete(+id);
    return new DeleteResponseDto();
  }
}
