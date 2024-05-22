import { PartialType } from '@nestjs/swagger';
import { CreateRequestStatusTypeDto } from './create-request_status_type.dto';

export class UpdateRequestStatusTypeDto extends PartialType(CreateRequestStatusTypeDto) {}
