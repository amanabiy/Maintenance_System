import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RequestStatusType } from './entities/request_status_type.entity';
import { CreateRequestStatusTypeDto } from './dto/create-request_status_type.dto';
import { UpdateRequestStatusTypeDto } from './dto/update-request_status_type.dto';
import { GenericDAL } from 'src/DAL/dal';
import { FindAllResponseRequestStatustypeDto } from './dto/find-all-response-maintenance_requestdto';
import { Role } from '../role/entities/role.entity';
import { RoleService } from '../role/role.service';
import { MaintenanceRequestType } from '../maintenance_request_type/entities/maintenance_request_type.entity';
import { RequestStatus } from '../request_status/entities/request_status.entity';
import { RequestStatusService } from '../request_status/request_status.service';

@Injectable()
export class RequestStatusTypeService extends GenericDAL<RequestStatusType, CreateRequestStatusTypeDto, UpdateRequestStatusTypeDto> {
  constructor(
    @InjectRepository(RequestStatusType)
    private readonly requestStatusTypeRepository: Repository<RequestStatusType>,
    @Inject(forwardRef(() => RequestStatusService))
    private readonly requestStatusRepository: RequestStatusService,
    private readonly roleService: RoleService,
  ) {
    super(requestStatusTypeRepository, 0, 10, ['allowedTransitions', 'allowedRoles']);
  }

  async findInitialStatusType(): Promise<RequestStatusType> {
    return await this.findOne(-1, { where: { isInitialStatus: true } });
  }

  async createRequestStatusType(createRequestStatusTypeDto: CreateRequestStatusTypeDto): Promise<RequestStatusType> {
    const { allowedTransitions, allowedRolesIds } = createRequestStatusTypeDto;

    // Find next options by IDs if provided
    let nextStatusOptions: RequestStatusType[] = [];
    if (allowedTransitions && allowedTransitions.length > 0) {
      nextStatusOptions = await this.find({
        where: { id: In(allowedTransitions) },
      });
    }

    let allowedRoles: Role[] = [];
    if (allowedRolesIds && allowedRolesIds.length > 0) {
      allowedRoles = await this.roleService.find({
        where: { id: In(allowedRolesIds) },
      });
    }
    

    const newStatusType = await this.create({
      ...createRequestStatusTypeDto,
      allowedTransitions: nextStatusOptions,
      allowedRoles,
    });

    return newStatusType;
  }

  async deleteForDev(id: number): Promise<void> {
    const requestStatusType = await this.findOne(id, {
      relations: ['allowedTransitions', 'requestStatuses']
    });
  
    if (!requestStatusType) {
      throw new Error('Request status type not found');
    }
  
    if (requestStatusType.isInitialStatus) {
      throw new Error('Cannot delete initial status type');
    }
  
    // Delete associated maintenance requests
    if (requestStatusType.requestStatuses && requestStatusType.requestStatuses.length > 0) {
      for (const requestStatus of requestStatusType.requestStatuses) {
        await this.requestStatusRepository.delete(requestStatus.id);
      }
    }
  
    // Remove allowed transitions relations
    if (requestStatusType.allowedTransitions && requestStatusType.allowedTransitions.length > 0) {
      await this.requestStatusTypeRepository
        .createQueryBuilder()
        .relation(RequestStatusType, 'allowedTransitions')
        .of(requestStatusType)
        .remove(requestStatusType.allowedTransitions);
    }
  
    await this.requestStatusTypeRepository.delete(id);
  }
  

  async delete(id: number): Promise<void> {
    const requestStatusType = await this.findOne(id);
    if (!requestStatusType) {
      throw new BadRequestException('Request status type not found');
    }

    if (requestStatusType.isInitialStatus) {
      throw new BadRequestException('Cannot delete initial status type');
    }

      // Check if there are any associated maintenance requests
  if (requestStatusType.requestStatuses && requestStatusType.requestStatuses.length > 0) {
    throw new BadRequestException('Cannot delete status type as there are associated maintenance requests');
  }

    await this.requestStatusTypeRepository
      .createQueryBuilder()
      .relation(RequestStatusType, 'allowedTransitions')
      .of(requestStatusType)
      .remove(requestStatusType.allowedTransitions);

    await super.delete(id);
  }

  async markAsInitial(id: number): Promise<RequestStatusType> {
    const requestStatusType = await this.findOne(id);
    await this.disableOtherInitials();
    requestStatusType.isInitialStatus = true;
    return await this.requestStatusTypeRepository.save(requestStatusType);
  }

  async disableOtherInitials(): Promise<void> {
    await this.requestStatusTypeRepository.update({ isInitialStatus: true }, { isInitialStatus: false });
  }

  async getLatestStatusTypeIds(roleIds: number[]): Promise<RequestStatusType[]> {
    console.log(roleIds);
    const statusTypes = await this.requestStatusTypeRepository.find({
      where: {
        allowedRoles: {
          id: In(roleIds),
        },
      },
      relations: ['allowedRoles'],
    });
    return statusTypes;
  }

  async updateRequestStatusType(id: number, updateMaintenanceRequestTypeDto: UpdateRequestStatusTypeDto): Promise<RequestStatusType> {
    const maintenanceRequestType = await this.findOne(id, { relations: ['allowedRoles', 'allowedTransitions'] });
    if (!maintenanceRequestType) {
      throw new NotFoundException(`Maintenance request type with id ${id} not found`);
    }

    // Update basic properties
    const { allowedRolesIds, allowedTransitions, ...rest } = updateMaintenanceRequestTypeDto;
    Object.assign(maintenanceRequestType, rest);

    // Update allowed roles
    if (allowedRolesIds) {
      maintenanceRequestType.allowedRoles = await this.roleService.findByIds(allowedRolesIds);
    }

    // Update allowed transitions
    if (allowedTransitions) {
      maintenanceRequestType.allowedTransitions = await this.findByIds(allowedTransitions);
    }

    return await super.update(maintenanceRequestType.id, maintenanceRequestType);
  }


}
