import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRequest } from './entities/maintenance_request.entity';
import { Repository } from 'typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { CreateMaintenanceRequestDto } from './dto/create-maintenance_request.dto';
import { UpdateMaintenanceRequestDto } from './dto/update-maintenance_request.dto';
import { LocationService } from '../location/location.service';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MaintenanceRequestService extends GenericDAL<MaintenanceRequest, CreateMaintenanceRequestDto, UpdateMaintenanceRequestDto> {
  constructor(
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRequestRepository: Repository<MaintenanceRequest>,
    private readonly locationService: LocationService,
    private readonly userService: UserService,
    private readonly departmentService: DepartmentService,
    private readonly maintenanceRequestTypeService: MaintenanceRequestTypeService,
  ) {
    super(maintenanceRequestRepository);
  }

  async createRequest(dto: CreateMaintenanceRequestDto, currentUser: User): Promise<MaintenanceRequest> {
    const { locationId, handlingDepartmentId, assignedPersonIds, maintenanceRequestTypeIds, ...rest } = dto;

    const location = locationId ? await this.locationService.findOne(locationId) : null;
    const requester = currentUser;
    const handlingDepartment = handlingDepartmentId ? await this.departmentService.findOne(handlingDepartmentId) : null;
    const assignedPersons = assignedPersonIds ? await this.userService.findByIds(assignedPersonIds) : [];
    const maintenanceRequestTypes = maintenanceRequestTypeIds ? await this.maintenanceRequestTypeService.findByIds(maintenanceRequestTypeIds) : [];

    const toCreate = {
      ...rest,
      location,
      requester,
      handlingDepartment,
      assignedPersons,
      maintenanceRequestTypes,
    }

    return super.create(toCreate);
  }

  async updateRequest(id: number, dto: UpdateMaintenanceRequestDto, currentUser: User): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.findOne(id);
    if (!maintenanceRequest) {
      // Throw error if maintenance request is not found
      throw new Error('Maintenance request not found');
    }

    const { locationId, handlingDepartmentId, assignedPersonIds, maintenanceRequestTypeIds, ...rest } = dto;

    if (locationId) {
      maintenanceRequest.location = await this.locationService.findOne(locationId);
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

    Object.assign(maintenanceRequest, rest);
    console.log(maintenanceRequest)
    return this.maintenanceRequestRepository.save(maintenanceRequest);
  }
  
  
}
