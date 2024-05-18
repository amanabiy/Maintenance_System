import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestStatusTypeService } from './request_status_type.service';
import { RequestStatusTypeController } from './request_status_type.controller';
import { RequestStatusType } from './entities/request_status_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestStatusType])],
  controllers: [RequestStatusTypeController],
  providers: [RequestStatusTypeService],
})
export class RequestStatusTypeModule {}
