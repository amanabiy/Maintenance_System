import { PartialType } from '@nestjs/swagger';
import { CreateRequestStatusDto } from './create-request_status.dto';

export class UpdateRequestStatusDto extends PartialType(CreateRequestStatusDto) {}
