import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestStatus } from './entities/request_status.entity';
import { GenericDAL } from 'src/DAL/dal';
import { FindAllResponseRequestStatusDto } from './dto/find-all-response-maintenance_requestdto';
import { RequestStatusTypeService } from '../request_status_type/request_status_type.service';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { UpdateMaintenanceRequestDto } from '../maintenance_request/dto/update-maintenance_request.dto';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserService } from '../user/user.service';
import { MediaService } from '../media/media.service';
import { RoleService } from '../role/role.service';
import { MaintenanceRequestTypeService } from '../maintenance_request_type/maintenance_request_type.service';
import { DepartmentService } from '../department/department.service';
import { User } from '../user/entities/user.entity';
import { UpdateRequestStatusDto } from './dto/update-request_status.dto';

@Injectable()
export class RequestStatusService extends GenericDAL<RequestStatus, any, any> {
  constructor(
    @InjectRepository(RequestStatus)
    private readonly requestStatusRepository: Repository<RequestStatus>,
    private readonly requestStatusTypeService: RequestStatusTypeService,
    @Inject(forwardRef(() => MaintenanceRequestService))
    private readonly maintenanceRequestService: MaintenanceRequestService,
    private readonly userService: UserService,
    private readonly mediaService: MediaService,
    private readonly roleService: RoleService,
    private readonly maintenanceRequestTypeService: MaintenanceRequestTypeService,
    private readonly departmentService: DepartmentService,
  ) {
    super(requestStatusRepository, 0, 10, ['request', 'statusUpdatedBy', 'statusType']);
  }

  async findAllForRequest(requestId: number): Promise<FindAllResponseRequestStatusDto> {
    return await this.findWithPagination({
      where: { request: { id: requestId } },
    });
  }

  async findOneForRequest(requestId: number, statusId: number): Promise<RequestStatus> {
    return await this.findOne(statusId, {
      where: { id: statusId, request: { id: requestId } },
    });
  }

  async updateMaintenanceRequest(id: number, newRequestStatusTypeId: number, updateDto: UpdateMaintenanceRequestDto, updateRequestStatus: UpdateRequestStatusDto, currentUser: User): Promise<MaintenanceRequest> {
    const maintenanceRequest: MaintenanceRequest = await this.maintenanceRequestService.findOne(id);
    const currentStatus = await super.findOne(-1, { where: { request: maintenanceRequest }, order: { createdAt: 'DESC' }, relations: ['statusType'] });
    const newRequestStatusType = await this.requestStatusTypeService.findOne(newRequestStatusTypeId);
    let internalVersionChanges = 'Internal changes\n';



    // Check if the new request status type is an allowed transition
    const isAllowedTransition = currentStatus.statusType.allowedTransitions.some(transition => transition.id === newRequestStatusTypeId);
    if (!isAllowedTransition) {
      throw new Error('Invalid status transition');
    }

    if (newRequestStatusType.allowChangePriority && updateDto.priority !== undefined) {
      const oldPriority = maintenanceRequest.priority;
      maintenanceRequest.priority = updateDto.priority;
      internalVersionChanges += `Priority changed from ${oldPriority} to ${updateDto.priority}\n`;
    }

    if (newRequestStatusType.needsFile && !maintenanceRequest.mediaFiles.length) {
      throw new Error('File is required');
    }

    // update for feedback, confirmationStatus, verificationStatus
    if (newRequestStatusType.allowChangeconfirmationStatus) {
      if (updateDto.confirmationStatus !== undefined) {
        internalVersionChanges += `Confirmation status changed from ${maintenanceRequest.confirmationStatus} to ${updateDto.confirmationStatus}\n`;
        maintenanceRequest.confirmationStatus = updateDto.confirmationStatus;
      }
      if (updateDto.feedback !== undefined) {
        internalVersionChanges += `Feedback updated from ${maintenanceRequest.feedback} to ${updateDto.feedback}\n`;
        maintenanceRequest.feedback = updateDto.feedback;
      }
      if (updateDto.rating !== undefined) {
        internalVersionChanges += `Rating updated from ${maintenanceRequest.rating} to ${updateDto.rating}\n`;
        maintenanceRequest.rating = updateDto.rating;
      }
    }

    // Update verificationStatus if allowed
    if (newRequestStatusType.allowChangeverificationStatus && updateDto.verificationStatus !== undefined) {
      internalVersionChanges += `Verification status changed from ${maintenanceRequest.verificationStatus} to ${updateDto.verificationStatus}\n`;
      maintenanceRequest.verifiedAt = new Date();
      maintenanceRequest.verifiedBy = Promise.resolve(currentUser);
      maintenanceRequest.verificationStatus = updateDto.verificationStatus;
    }

    // Update assigned persons if allowed
    if (newRequestStatusType.allowsForwardToPerson && updateDto.assignedPersonIds) {
      internalVersionChanges += `Assigned persons updated from ${maintenanceRequest.assignedPersons} to ${updateDto.assignedPersonIds}\n`;
      maintenanceRequest.assignedPersons = await this.userService.findByIds(updateDto.assignedPersonIds);
    }

    // Update handling department if allowed
    if (newRequestStatusType.allowsForwardToDepartment && updateDto.handlingDepartmentId) {
      internalVersionChanges += `Handling department updated from ${maintenanceRequest.handlingDepartment} to ${updateDto.handlingDepartmentId}\n`;
      maintenanceRequest.handlingDepartment = await this.departmentService.findOne(updateDto.handlingDepartmentId);
    }

    // Update maintenance request types if allowed
    if (newRequestStatusType.allowsChangeRequestTypes && updateDto.maintenanceRequestTypeIds) {
      internalVersionChanges += `Maintenance request types updated from ${maintenanceRequest.maintenanceRequestTypes} to ${updateDto.maintenanceRequestTypeIds}\n`;
      maintenanceRequest.maintenanceRequestTypes = await this.maintenanceRequestTypeService.findByIds(updateDto.maintenanceRequestTypeIds);
    }

    // update request status
    const newRequestStatus: Partial<RequestStatus> = {
      request: Promise.resolve(maintenanceRequest),
      statusType: newRequestStatusType,
      statusUpdatedBy: Promise.resolve(currentUser),
      internalNote: updateRequestStatus.internalNote,
      externalNote: updateRequestStatus.externalNote,
    }

    // update request status signature
    if (newRequestStatusType.needsSignatures && updateRequestStatus.signatureByName) {
      newRequestStatus.signatureByName = updateRequestStatus.signatureByName;
    }

    // update request status file
    if (newRequestStatusType.needsFile && updateRequestStatus.mediaFiles && updateRequestStatus.mediaFiles.length > 0) {
      newRequestStatus.mediaFiles = await this.mediaService.findByIds(updateRequestStatus.mediaFiles);
      // update internal version changes
    }

    // update request status schedule
    if (newRequestStatusType.hasSchedule && updateRequestStatus.scheduleMaintenanceStartDateTime && updateRequestStatus.scheduleMaintenanceEndDateTime) {
      newRequestStatus.scheduleMaintenanceStartDateTime = updateRequestStatus.scheduleMaintenanceStartDateTime;
      newRequestStatus.scheduleMaintenanceEndDateTime = updateRequestStatus.scheduleMaintenanceEndDateTime;
    }

    newRequestStatus.internalVersionChanges = internalVersionChanges;
    const createdRequestStatus = await this.create(newRequestStatus);

    maintenanceRequest.requestStatuses.push(createdRequestStatus);
    await this.maintenanceRequestService.update(maintenanceRequest.id, maintenanceRequest);

    return maintenanceRequest;
  }
}
