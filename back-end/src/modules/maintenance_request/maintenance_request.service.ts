import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { In, Repository } from 'typeorm';
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


  async searchRequests(criteria: SearchMaintenanceRequestDto): Promise<findAllResponseDto<MaintenanceRequest>> {
    const where: any = {};
    console.log("sdfsd")
    if (criteria.assignedPersonIds && criteria.assignedPersonIds.length > 0) {
      where.assignedPersons = { id: In(criteria.assignedPersonIds) };
    }

    if (criteria.maintenanceRequestTypeIds && criteria.maintenanceRequestTypeIds.length > 0) {
      where.maintenanceRequestTypes = { id: In(criteria.maintenanceRequestTypeIds) };
    }

    if (criteria.handlingDepartmentId) {
      where.handlingDepartment = { id: criteria.handlingDepartmentId };
    }

    if (criteria.requesterId) {
      where.requester = { id: criteria.requesterId };
    }

    if (criteria.confirmationStatus) {
      where.confirmationStatus = criteria.confirmationStatus;
    }

    if (criteria.verificationStatus) {
      where.verificationStatus = criteria.verificationStatus;
    }

    if (criteria.verifiedById) {
      where.verifiedBy = { id: criteria.verifiedById }; // Assuming 'verifiedBy' is a relation with 'User'
    }
    console.log("here")
    console.log("where", where)
    return await this.findWithPagination({
      where,
    });
  }

  async delete(id: number): Promise<void> {
    const result = await this.maintenanceRequestRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MaintenanceRequest with ID ${id} not found`);
    }
  }
}
