import { PartialType } from '@nestjs/swagger';
import { CreateRequestStatusTimeDto } from './create-request_status_time.dto';

export class UpdateRequestStatusTimeDto extends PartialType(CreateRequestStatusTimeDto) {}
