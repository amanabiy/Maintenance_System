import { Module } from '@nestjs/common';
import { RequestStatusService } from './request_status.service';
import { RequestStatusController } from './request_status.controller';

@Module({
  controllers: [RequestStatusController],
  providers: [RequestStatusService],
})
export class RequestStatusModule {}
