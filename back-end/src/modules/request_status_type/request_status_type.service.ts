import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RequestStatusType } from './entities/request_status_type.entity';
import { CreateRequestStatusTypeDto } from './dto/create-request_status_type.dto';
import { UpdateRequestStatusTypeDto } from './dto/update-request_status_type.dto';
import { GenericDAL } from 'src/DAL/dal';
import { FindAllResponseRequestStatustypeDto } from './dto/find-all-response-maintenance_requestdto';

@Injectable()
export class RequestStatusTypeService extends GenericDAL<RequestStatusType, CreateRequestStatusTypeDto, UpdateRequestStatusTypeDto> {
  constructor(
    @InjectRepository(RequestStatusType)
    private readonly requestStatusTypeRepository: Repository<RequestStatusType>,
  ) {
    super(requestStatusTypeRepository);
  }

  async createRequestStatusType(createRequestStatusTypeDto: CreateRequestStatusTypeDto): Promise<RequestStatusType> {
    const { name, hasSchedule, needsFile, needsSignatures, isInternal, requiresForwardToDepartment, requiresForwardToPerson, allowedTransitions } = createRequestStatusTypeDto;
    
    // Find next options by IDs if provided
    let nextStatusOptions: RequestStatusType[] = [];
    if (allowedTransitions && allowedTransitions.length > 0) {
      nextStatusOptions = await this.find({
        where: { id: In(allowedTransitions) },
      });
    }

    const newStatusType = await this.create({
      name,
      hasSchedule,
      needsFile,
      needsSignatures,
      isInternal,
      requiresForwardToDepartment,
      requiresForwardToPerson,
      allowedTransitions: nextStatusOptions,
    });

    return newStatusType;
  }

  async delete(id: number): Promise<void> {
    const requestStatusType = await this.findOne(id);
    if (!requestStatusType) {
      throw new Error('Request status type not found');
    }

    await this.requestStatusTypeRepository
      .createQueryBuilder()
      .relation(RequestStatusType, 'allowedTransitions')
      .of(requestStatusType)
      .remove(requestStatusType.allowedTransitions);

    await super.delete(id);
  }

  async findAll(): Promise<FindAllResponseRequestStatustypeDto> {
    return await super.findWithPagination({ relations: ['allowedTransitions'] });
  }

  async findOne(id: number): Promise<RequestStatusType> {
    const requestStatusType = await super.findOne(id, { relations: ['allowedTransitions'] });
    return requestStatusType;
  }
}
