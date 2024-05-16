import { Injectable } from '@nestjs/common';
import { CreateRequestStatusDto } from './dto/create-request_status.dto';
import { UpdateRequestStatusDto } from './dto/update-request_status.dto';

@Injectable()
export class RequestStatusService {
  create(createRequestStatusDto: CreateRequestStatusDto) {
    return 'This action adds a new requestStatus';
  }

  findAll() {
    return `This action returns all requestStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requestStatus`;
  }

  update(id: number, updateRequestStatusDto: UpdateRequestStatusDto) {
    return `This action updates a #${id} requestStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} requestStatus`;
  }
}
