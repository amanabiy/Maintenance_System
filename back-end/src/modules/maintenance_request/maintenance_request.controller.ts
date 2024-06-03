import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards, Query, NotFoundException } from '@nestjs/common';
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
import { SearchMaintenanceRequestDto } from './dto/filter-maintenance_request.dto';
import findAllResponseDto from 'src/dto/find-all-response.dto';

@ApiTags('Maintenance Request')
@Controller('maintenance-request')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
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
    const result = await this.maintenanceRequestService.findAll(page, limit);
    result.items.map(item => plainToInstance(MaintenanceRequest, item))
    return result
  }

  @Get('assigned-to-me')
  @ApiOperation({ summary: 'Filter maintenance requests assigned to the current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved maintenance requests assigned to the current user successfully',
    type: FindAllResponseMaintenanceRequestDto,
  })
  async findAssignedToMe(
    @CurrentUser() currentUser: User,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 50,
  ): Promise<FindAllResponseMaintenanceRequestDto> {
    const result = await this.maintenanceRequestService.findWithPagination({
      where: { assignedPersons: { id: currentUser.id } }
    }, page, limit);

    result.items.map(item => plainToInstance(MaintenanceRequest, item));
    return result;
  }

  @Get('my-requests')
  @ApiOperation({ summary: 'Get maintenance requests created by the current user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved maintenance requests created by the current user successfully',
    type: FindAllResponseMaintenanceRequestDto,
  })
  async findMyRequests(
    @CurrentUser() currentUser: User,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ): Promise<FindAllResponseMaintenanceRequestDto> {
    const result = await this.maintenanceRequestService.findWithPagination({
      where: { requester: { id: currentUser.id }}
    }, page, limit);

    result.items.map(item => plainToInstance(MaintenanceRequest, item));
    return result;
  }

  @Get('my-department')
  @ApiOperation({ summary: 'Get maintenance requests assigned to the current user\'s department' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved maintenance requests for the current user\'s department successfully',
    type: FindAllResponseMaintenanceRequestDto,
  })
  async findMyDepartmentRequests(
    @CurrentUser() currentUser: User,
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ): Promise<FindAllResponseMaintenanceRequestDto> {
    if (!currentUser.department) {
      throw new NotFoundException('Department of the logged in user is not found');
    }
    const result = await this.maintenanceRequestService.findWithPagination({
      where: { handlingDepartment: { id: currentUser.department.id } }
    }, page, limit);
    result.items.map(item => plainToInstance(MaintenanceRequest, item));
    return result;
  }

  @Get('by-my-role')
  @ApiOperation({ summary: 'Filter maintenance requests by logged in user role' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Filtered maintenance requests by role successfully', type: [MaintenanceRequest] })
  async findByRole(@Query('page') page = 1, @Query('limit') limit = 50, @CurrentUser() currentUser: User): Promise<FindAllResponseMaintenanceRequestDto> {
    console.log("in controller", currentUser);
    const result = await this.maintenanceRequestService.findAllByRole(currentUser.role.id, page, limit);
    result.items.map(item => plainToInstance(MaintenanceRequest, item));
    return result;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a maintenance request by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved maintenance request successfully', type: MaintenanceRequest })
  @ApiNotFoundResponse({ description: 'Maintenance request with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<MaintenanceRequest> {
    return plainToInstance(MaintenanceRequest, await this.maintenanceRequestService.findOne(+id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a maintenance request by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Maintenance request has been successfully updated', type: MaintenanceRequest })
  @ApiNotFoundResponse({ description: 'Maintenance request with the specified ID not found' })
  async update(@Param('id') id: string,
    @Body() updateMaintenanceRequestDto: UpdateMaintenanceRequestDto,
    @CurrentUser() currentUser: User): Promise<MaintenanceRequest> {
    return plainToInstance(MaintenanceRequest, await this.maintenanceRequestService.updateRequest(+id, updateMaintenanceRequestDto, currentUser));
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

  @Post('search')
  @ApiOperation({ summary: 'Search maintenance requests' })
  @ApiResponse({ status: 200, description: 'Successful search', type: FindAllResponseMaintenanceRequestDto })
  async searchRequests(
    @Body() criteria: SearchMaintenanceRequestDto,
    @CurrentUser() currentUser: User,
  ): Promise<findAllResponseDto<MaintenanceRequest>> {
    console.log(criteria);
    return await this.maintenanceRequestService.searchRequests(criteria, currentUser);
  }

  @Get('by-status/:statusTypeId')
  @ApiOperation({ summary: 'Filter maintenance requests by their latest status' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Filtered maintenance requests by their latest status successfully', type: [MaintenanceRequest] })
  async findByLatestStatus(@Param('statusTypeId') statusTypeId: number, @Query('page') page = 1, @Query('limit') limit = 50): Promise<FindAllResponseMaintenanceRequestDto> {
    console.log("c", statusTypeId)
    const result = await this.maintenanceRequestService.findAllByLatestStatus(statusTypeId, page, limit);
    result.items.map(item => plainToInstance(MaintenanceRequest, item));
    return result;
  }


}
