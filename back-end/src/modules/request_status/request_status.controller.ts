import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequestStatusService } from './request_status.service';
import { CreateRequestStatusDto } from './dto/create-request_status.dto';
import { UpdateRequestStatusDto } from './dto/update-request_status.dto';

@Controller('request-status')
export class RequestStatusController {
  constructor(private readonly requestStatusService: RequestStatusService) {}

  @Post()
  create(@Body() createRequestStatusDto: CreateRequestStatusDto) {
    return this.requestStatusService.create(createRequestStatusDto);
  }

  @Get()
  findAll() {
    return this.requestStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequestStatusDto: UpdateRequestStatusDto) {
    return this.requestStatusService.update(+id, updateRequestStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestStatusService.remove(+id);
  }
}
