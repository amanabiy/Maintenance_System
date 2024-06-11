import { Controller, Get, Param, NotFoundException, UseGuards, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiNotFoundResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RequestStatusService } from './request_status.service';
import { RequestStatus } from './entities/request_status.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { FindAllResponseRequestStatusDto } from './dto/find-all-response-maintenance_requestdto';
import { UpdateMaintenanceRequestDto } from '../maintenance_request/dto/update-maintenance_request.dto';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ChangeRequestStatusDto } from './dto/change-request_status.dto';
import { PermissionsGuard } from '../permission/guard/permissions.guard';
import { Permissions } from '../permission/decorator/permissions.decorator';
import { RequestStatusPermissionEnum } from './entities/request_status.permission.enum';

@ApiTags('Request Status')
@Controller('maintenance-requests/:requestId/statuses')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@ApiBearerAuth('bearerAuth')
export class RequestStatusController {
  constructor(private readonly requestStatusService: RequestStatusService) {}

  @Patch(':nextRequestTypeId')
  // @Permissions(RequestStatusPermissionEnum.CAN_UPDATE_MAINTENANCE_REQUEST_STATUS)
  async updateMaintenanceRequest(
    @Param('requestId') requestId: number,
    @Param('nextRequestTypeId') nextRequestTypeId: number,
    @Body() updateDto: ChangeRequestStatusDto,
    @CurrentUser() currentUser: any,
  ): Promise<MaintenanceRequest> {
    console.log("request id", requestId);
    const { updateMaintenance, updateRequestStatus } = updateDto;
    return await this.requestStatusService.updateMaintenanceRequest(
      requestId,
      nextRequestTypeId,
      updateMaintenance,
      updateRequestStatus,
      currentUser
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all statuses for a request' })
  // @Permissions(RequestStatusPermissionEnum.CAN_VIEW_ALL_STATUSES_FOR_REQUEST)
  @ApiResponse({ status: 200, description: 'List of all statuses for the given request', type: [RequestStatus] })
  async findAllForRequest(@Param('requestId') requestId: number): Promise<FindAllResponseRequestStatusDto> {
    const statuses = await this.requestStatusService.findAllForRequest(requestId);
    if (!statuses.items.length) {
      throw new NotFoundException(`No statuses found for maintenance request with ID ${requestId}`);
    }
    return statuses;
  }

  @Get(':statusId')
  @ApiOperation({ summary: 'Get a single status by ID for a given request' })
  @ApiResponse({ status: 200, description: 'The status of the maintenance request', type: RequestStatus })
  // @Permissions(RequestStatusPermissionEnum.CAN_VIEW_SINGLE_STATUS_FOR_REQUEST)
  @ApiNotFoundResponse({ description: 'Status with the specified ID not found for the given request' })
  async findOneForRequest(@Param('requestId') requestId: number, @Param('statusId') statusId: number): Promise<RequestStatus> {
    const status = await this.requestStatusService.findOneForRequest(requestId, statusId);
    if (!status) {
      throw new NotFoundException(`Status with ID ${statusId} not found for maintenance request with ID ${requestId}`);
    }
    return status;
  }
}
