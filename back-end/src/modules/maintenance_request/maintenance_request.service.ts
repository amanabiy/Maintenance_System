import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { In, Like, Repository } from 'typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance_request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance_request.dto';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { MediaService } from '../media/media.service';
import { User } from '../user/entities/user.entity';
import { SearchMaintenanceRequestDto } from './dto/filter-maintenance_request.dto';
import findAllResponseDto from 'src/dto/find-all-response.dto';
import { MaintenanceVerificationStatusEnum } from './entities/maintenance_request.enum';
import { RoleService } from '../role/role.service';
import { RequestStatusService } from '../request_status/request_status.service';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { PermissionService } from '../permission/permission.service';
import { MaintenanceRequestPermissionEnum } from './entities/maintenance_request-permission.entum';
import { RequestStatus } from '../request_status/entities/request_status.entity';

@Injectable()
export class MaintenanceRequestService extends GenericDAL<MaintenanceRequest, CreateMaintenanceRequestDto, UpdateMaintenanceRequestDto> {
  constructor(
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRequestRepository: Repository<MaintenanceRequest>,
    private readonly locationService: LocationService,
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService,
    private readonly maintenanceRequestTypeService: MaintenanceRequestTypeService,
    private readonly mediaService: MediaService,
    private readonly roleService: RoleService,
    @Inject(forwardRef(() => RequestStatusService))
    private readonly requestStatusService: RequestStatusService,
    private readonly requestStatusTypeService: RequestStatusTypeService,
    private readonly permissionService: PermissionService,
  ) {
    super(maintenanceRequestRepository, 1, 10, 
      [
        'assignedPersons',
        'maintenanceRequestTypes',
        'handlingDepartment',
        'requester',
        'verifiedBy',
        'mediaFiles',
        'requestStatuses'
      ]
    );
  }

  async setVerificationStatus(dto: CreateMaintenanceRequestDto, currentUser: User): Promise<MaintenanceVerificationStatusEnum> {
    const studentRole = await this.roleService.findByName("STUDENT")
    console.log(studentRole, currentUser)
    if (currentUser.role.id === studentRole.id) {
      return MaintenanceVerificationStatusEnum.PENDING;
    }
    return MaintenanceVerificationStatusEnum.NOT_REQUIRED;
  }

  async createRequest(dto: CreateMaintenanceRequestDto, currentUser: User): Promise<MaintenanceRequest> {
    const { locationCreate, maintenanceRequestTypeIds, mediaIds, ...rest } = dto;

    const location = locationCreate ? await this.locationService.create(locationCreate) : null;
    const requester = currentUser;
    const maintenanceRequestTypes = maintenanceRequestTypeIds ? await this.maintenanceRequestTypeService.findByIds(maintenanceRequestTypeIds) : [];
    const mediaFiles = mediaIds ? await this.mediaService.findByIds(mediaIds) : [];
    const verificationStatus = await this.setVerificationStatus(dto, currentUser);

    const toCreate = {
      ...rest,
      location,
      requester,
      verificationStatus,
      maintenanceRequestTypes,
      mediaFiles,
    }

    const initialStatusType = await this.requestStatusTypeService.findInitialStatusType();

    const maintenanceRequest = await this.create(toCreate);

    // Create the initial request status
    const initialRequestStatus = await this.requestStatusService.create({
      request: Promise.resolve(maintenanceRequest),
      statusType: initialStatusType,
      statusUpdatedBy: Promise.resolve(currentUser),
    });

    maintenanceRequest.requestStatuses = [initialRequestStatus];
    return await this.maintenanceRequestRepository.save(maintenanceRequest);
  }

  async updateRequest(id: number, dto: UpdateMaintenanceRequestDto, currentUser: User): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.findOne(id);
    if (!maintenanceRequest) {
      // Throw error if maintenance request is not found
      throw new Error('Maintenance request not found');
    }

    const { locationCreate, handlingDepartmentId, assignedPersonIds, maintenanceRequestTypeIds, mediaIds, ...rest } = dto;

    if (locationCreate) {
      maintenanceRequest.location = await this.locationService.create(locationCreate);
    }
    if (handlingDepartmentId) {
      maintenanceRequest.handlingDepartment = await this.departmentService.findOne(handlingDepartmentId);
    }
    if (assignedPersonIds) {
      maintenanceRequest.assignedPersons = await this.userService.findByIds(assignedPersonIds);
    }
    if (maintenanceRequestTypeIds) {
      maintenanceRequest.maintenanceRequestTypes = await this.maintenanceRequestTypeService.findByIds(maintenanceRequestTypeIds);
    }
    if (mediaIds) {
      maintenanceRequest.mediaFiles = await this.mediaService.findByIds(mediaIds);
    }

    Object.assign(maintenanceRequest, rest);
    console.log(maintenanceRequest)
    return this.maintenanceRequestRepository.save(maintenanceRequest);
  }


  async searchRequests(criteria: SearchMaintenanceRequestDto, currentUser: User): Promise<findAllResponseDto<MaintenanceRequest>> {
    const where: any = {};

    if (criteria.assignedPersonIds && criteria.assignedPersonIds.length > 0) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_ASSIGNED_PERSON_IDS)) {
        throw new ForbiddenException('You do not have permission to search by assigned person IDs');
      }
      where.assignedPersons = { id: In(criteria.assignedPersonIds) };
    }

    if (criteria.maintenanceRequestTypeIds && criteria.maintenanceRequestTypeIds.length > 0) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_REQUEST_TYPE_IDS)) {
        throw new ForbiddenException('You do not have permission to search by request type IDs');
      }
      where.maintenanceRequestTypes = { id: In(criteria.maintenanceRequestTypeIds) };
    }

    if (criteria.handlingDepartmentId) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_HANDLING_DEPARTMENT_ID)) {
        throw new ForbiddenException('You do not have permission to search by handling department ID');
      }
      where.handlingDepartment = { id: criteria.handlingDepartmentId };
    }

    if (criteria.requesterId) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_REQUESTER_ID)) {
        throw new ForbiddenException('You do not have permission to search by requester ID');
      }
      where.requester = { id: criteria.requesterId };
    }

    if (criteria.confirmationStatus) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_CONFIRMATION_STATUS)) {
        throw new ForbiddenException('You do not have permission to search by confirmation status');
      }
      where.confirmationStatus = criteria.confirmationStatus;
    }

    if (criteria.verificationStatus) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_VERIFICATION_STATUS)) {
        throw new ForbiddenException('You do not have permission to search by verification status');
      }
      where.verificationStatus = criteria.verificationStatus;
    }

    if (criteria.verifiedById) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_VERIFIED_BY_ID)) {
        throw new ForbiddenException('You do not have permission to search by verified by ID');
      }
      where.verifiedBy = { id: criteria.verifiedById };
    }

    if (criteria.priority) {
      if (!this.permissionService.hasPermission(currentUser, MaintenanceRequestPermissionEnum.CAN_SEARCH_MAINTENANCE_REQUESTS_BY_PRIORITY)) {
        throw new ForbiddenException('You do not have permission to search by priority');
      }
      where.priority = criteria.priority;
    }

    console.log("here");
    console.log("where", where);

    return await this.findWithPagination({
      where,
    });
  }

  async findAllByLatestStatus(statusTypeId: number, page = 1, limit = 10): Promise<findAllResponseDto<MaintenanceRequest>> {
    const latestStatusIds: RequestStatus[] = await this.requestStatusService.getLatestStatusIds(statusTypeId);
    const statusIds = latestStatusIds.map((status) => status.id);
    const result = await this.findWithPagination({
      where: {
        requestStatuses: {
          id: In(statusIds),
          statusType: {
            id: statusTypeId,
          },
        },
      },
    }, page, limit);
    return result;
  }

  async findAllByRoleAndStatus(
    roleId: number,
    statusTypeId?: number,
    term?: string,
    page = 1,
    limit = 10
  ): Promise<findAllResponseDto<MaintenanceRequest>> {
    // Fetch the latest status types and their IDs in parallel
    const statusTypes = await this.requestStatusTypeService.getLatestStatusTypeIds([roleId]);
    const statusTypeIds = statusTypes.map((statusType) => statusType.id);

    const latestStatusIds = await this.requestStatusService.getLatestStatusByStatusTypeIds(statusTypeIds);
    const requestStatusIds = latestStatusIds.map((status) => status.id);

    // Construct the filters
    const filters: any = {
      requestStatuses: {
        id: In(requestStatusIds),
      },
    };

    // Include statusTypeId in filters if provided
    if (statusTypeId) {
      filters.requestStatuses = {
        statusType: {
          id: statusTypeId,
        }
      };
    }

    // Add fuzzy search terms if provided
    if (term) {
      filters['subject'] = Like(`%${term}%`);
      filters['description'] = Like(`%${term}%`);
      filters['requester'] = { name: Like(`%${term}%`) };
    }

    // Fetch the filtered results with pagination
    return await this.findWithPagination({ where: filters }, page, limit);
  }



  async findAllByRequester(
    requesterId: number,
    statusType?: number,
    term?: string,
    page = 1,
    limit = 10
  ): Promise<findAllResponseDto<MaintenanceRequest>> {
    const filters: any = {
      requester: {
        id: requesterId,
      },
    };

    if (statusType) {
      filters.requestStatuses = {
        statusType: {
          id: statusType,
        },
      };
    }

    if (term) {
      filters['subject'] = Like(`%${term}%`);
      filters['description'] = Like(`%${term}%`);
      filters['requester'] = { name: Like(`%${term}%`) };
    }
    return await this.findWithPagination({ where: filters }, page, limit);
  }

  async findAllByDepartment(
    departmentId: number,
    statusTypeId?: number,
    term?: string,
    page = 1,
    limit = 10
  ): Promise<findAllResponseDto<MaintenanceRequest>> {
    const filters: any = {
      handlingDepartment: {
        id: departmentId,
      },
    };

    // Include statusTypeId in filters if provided
    if (statusTypeId) {
      filters['requestStatuses'] = {
        statusType: {
          id: statusTypeId,
        },
      };
    }

    // Add fuzzy search terms if provided
    if (term) {
      filters['subject'] = Like(`%${term}%`);
      filters['description'] = Like(`%${term}%`);
      filters['requester'] = { name: Like(`%${term}%`) };
    }

    // Fetch the filtered results with pagination
    return await this.findWithPagination({ where: filters }, page, limit);
  }



  async findAllByAssignedPerson(
    assignedPersonId: number, 
    statusTypeId?: number, 
    term?: string, 
    page = 1, 
    limit = 10
  ): Promise<findAllResponseDto<MaintenanceRequest>> {
    // Construct the filters
    const filters: any = {
      assignedPersons: {
        id: assignedPersonId,
      },
    };
  
    // Include statusTypeId in filters if provided
    if (statusTypeId) {
      filters['requestStatuses']['statusType'] = {
        id: statusTypeId,
      };
    }
  
    // Add fuzzy search terms if provided
    if (term) {
      filters['subject'] = Like(`%${term}%`);
      filters['description'] = Like(`%${term}%`);
      filters['requester'] = { name: Like(`%${term}%`) };
    }
  
    // Fetch the filtered results with pagination
    return await this.findWithPagination({ where: filters }, page, limit);
  }


  async delete(id: number): Promise<void> {
    const result = await this.maintenanceRequestRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MaintenanceRequest with ID ${id} not found`);
    }
  }
}
