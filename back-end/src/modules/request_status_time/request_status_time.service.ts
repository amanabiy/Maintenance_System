import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestStatusTime } from './entities/request_status_time.entity';
import { CreateRequestStatusTimeDto } from './dto/create-request_status_time.dto';
import { RequestStatusTypeService } from 'src/modules/request_status_type/request_status_type.service';
import { MaintenanceRequestService } from 'src/modules/maintenance_request/maintenance_request.service';
import { UserService } from 'src/modules/user/user.service';
import { RequestStatusType } from '../request_status_type/entities/request_status_type.entity';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class RequestStatusTimeService {
  constructor(
    @InjectRepository(RequestStatusTime)
    private readonly requestStatusTimeRepository: Repository<RequestStatusTime>,
  ) {}

  async calculateSpentTime(start: Date, end: Date): Promise<number> {
    if (!start || !end) {
      throw new Error('Both start and end times must be provided');
    }
  
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
  
    if (endTime < startTime) {
      throw new Error('End time must be after start time');
    }
  
    const timeSpent = endTime - startTime; // Time spent in milliseconds
  
    return timeSpent;
  }

  async create(fromStatusType: RequestStatusType, toStatusType: RequestStatusType, request: MaintenanceRequest, processedBy: User, timeSpent): Promise<RequestStatusTime> {
    const requestStatusTime = new RequestStatusTime();
  
    requestStatusTime.fromStatusType = fromStatusType;
    requestStatusTime.toStatusType = toStatusType;
    requestStatusTime.request = request;
    requestStatusTime.processedBy = processedBy;
    requestStatusTime.timeSpent = timeSpent;

    return await this.requestStatusTimeRepository.save(requestStatusTime);
  }
}