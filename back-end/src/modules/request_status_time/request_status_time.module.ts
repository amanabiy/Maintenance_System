import { Module } from '@nestjs/common';
import { RequestStatusTimeService } from './request_status_time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusTime } from './entities/request_status_time.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([RequestStatusTime]) ],
  providers: [RequestStatusTimeService],
  exports: [RequestStatusTimeService, RequestStatusTimeModule]
})
export class RequestStatusTimeModule {}
