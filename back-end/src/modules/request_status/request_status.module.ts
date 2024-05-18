import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusService } from './request_status.service';
import { RequestStatusController } from './request_status.controller';
import { RequestStatus } from './entities/request_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatus])],
  controllers: [RequestStatusController],
  providers: [RequestStatusService],
})
export class RequestStatusModule {}
