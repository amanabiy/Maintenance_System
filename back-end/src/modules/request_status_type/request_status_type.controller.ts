import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { RequestStatusTypeService } from './request_status_type.service';
import { CreateRequestStatusTypeDto } from './dto/create-request_status_type.dto';
import { UpdateRequestStatusTypeDto } from './dto/update-request_status_type.dto';
import { RequestStatusType } from './entities/request_status_type.entity';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { FindAllResponseRequestStatustypeDto } from './dto/find-all-response-maintenance_requestdto';

@ApiTags('Request Status Type')
@Controller('request-status-type')
// @UseGuards(JwtAuthGuard, RolesGuard)
// @ApiBearerAuth('bearerAuth')
export class RequestStatusTypeController {
  constructor(private readonly requestStatusTypeService: RequestStatusTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new request status type' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The request status type has been successfully created', type: RequestStatusType })
  @ApiBadRequestResponse({ description: 'Invalid data provided for request status type creation' })
  async createRequestStatusType(@Body() createRequestStatusTypeDto: CreateRequestStatusTypeDto): Promise<RequestStatusType> {
    return await this.requestStatusTypeService.createRequestStatusType(createRequestStatusTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all request status types' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all request status types successfully', type: [RequestStatusType] })
  async findAll(): Promise<FindAllResponseRequestStatustypeDto> {
    return await this.requestStatusTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a request status type by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved request status type successfully', type: RequestStatusType })
  @ApiNotFoundResponse({ description: 'Request status type with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<RequestStatusType> {
    return await this.requestStatusTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a request status type by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request status type has been successfully updated', type: RequestStatusType })
  @ApiNotFoundResponse({ description: 'Request status type with the specified ID not found' })
  async update(@Param('id') id: string, @Body() updateRequestStatusTypeDto: UpdateRequestStatusTypeDto): Promise<RequestStatusType> {
    return await this.requestStatusTypeService.updateRequestStatusType(+id, updateRequestStatusTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a request status type by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request status type has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Request status type with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.requestStatusTypeService.delete(+id);
    return new DeleteResponseDto();
  }

  @Patch(':id/mark-initial')
  @ApiOperation({ summary: 'Mark a request status type as initial' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Request status type has been successfully marked as initial', type: RequestStatusType })
  @ApiNotFoundResponse({ description: 'Request status type with the specified ID not found' })
  async markAsInitial(@Param('id') id: string): Promise<RequestStatusType> {
    return await this.requestStatusTypeService.markAsInitial(+id);
  }
}
