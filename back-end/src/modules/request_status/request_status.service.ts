import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestStatus } from './entities/request_status.entity';
import { GenericDAL } from 'src/DAL/dal';
import { FindAllResponseRequestStatusDto } from './dto/find-all-response-maintenance_requestdto';

@Injectable()
export class RequestStatusService extends GenericDAL<RequestStatus, any, any> {
  constructor(
    @InjectRepository(RequestStatus)
    private readonly requestStatusRepository: Repository<RequestStatus>,
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
}
