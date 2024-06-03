import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { FindAllResponsePaymentDto } from './dto/find-all-response-payment.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ChangePaymentStatusDto } from './dto/change-payment-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { PaymentStatus } from './entities/payment_status.enum';
import { PermissionsGuard } from '../permission/guard/permissions.guard';
import { Permission } from '../permission/entities/permission.entity';
import { Permissions } from '../permission/decorator/permissions.decorator';

@Controller('payments')
@ApiTags('Payment')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @Permissions('CAN_CREATE_PAYMENT')
  async create(@Body() paymentData: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(paymentData);
  }

  @Get()
  @Permissions('CAN_VIEW_ALL_PAYMENTS')
  async findAll(): Promise<FindAllResponsePaymentDto> {
    return this.paymentService.findAll();
  }

  @Get('my-payments')
  @ApiOperation({ summary: 'Filter payments made by the logged-in user based on status' })
  @ApiQuery({ name: 'status', required: true, enum: PaymentStatus })
  @ApiResponse({ status: 200, description: 'Payments filtered successfully', type: [Payment] })
  async filterPaymentsByStatus(
    @Query('status') status: PaymentStatus,
    @CurrentUser() currentUser: User,
  ): Promise<FindAllResponsePaymentDto> {
    return this.paymentService.filterPaymentsByStatus(currentUser, status);
  }

  @Get('filter')
  @Permissions('CAN_FILTER_PAYMENTS')
  @ApiOperation({ summary: 'Filter payments based on user, maintenance request, and status' })
  @ApiQuery({ name: 'status', required: false, enum: PaymentStatus })
  @ApiQuery({ name: 'userId', required: false, type: Number })
  @ApiQuery({ name: 'maintenanceRequestId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Payments filtered successfully', type: [Payment] })
  async filterPayments(
    @CurrentUser() currentUser: User,
    @Query('status') status?: PaymentStatus,
    @Query('userId') userId?: number,
    @Query('maintenanceRequestId') maintenanceRequestId?: number,
  ): Promise<FindAllResponsePaymentDto> {
    const result = await this.paymentService.filterPayments(currentUser, status, userId, maintenanceRequestId);
    return result;
  }

  @Get(':id')
  @Permissions('CAN_VIEW_PAYMENT')
  async findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Delete(':id')
  @Permissions('CAN_DELETE_PAYMENT')
  async delete(@Param('id') id: number): Promise<void> {
    return this.paymentService.delete(id);
  }

  @Patch(':id/add-receipt/:receiptId')
  @ApiOperation({ summary: 'Add receipt to a payment' })
  @ApiResponse({ status: 200, description: 'Receipt added successfully', type: Payment })
  @Permissions('CAN_ADD_RECEIPT_TO_PAYMENT')
  async addReceipt(
    @Param('id') id: number,
    @Param('receiptId') receiptId: number,
    @CurrentUser() currentUser: User,
  ): Promise<Payment> {
    return this.paymentService.addReceipt(id, receiptId, currentUser);
  }

  @Patch(':id/change-status')
  @Permissions('CAN_CHANGE_PAYMENT_STATUS')
  @ApiOperation({ summary: 'Change the status of a payment' })
  @ApiResponse({ status: 200, description: 'Payment status changed successfully', type: Payment })
  async changeStatus(
    @Param('id') id: number,
    @Body() changeStatusDto: ChangePaymentStatusDto,
    @CurrentUser() currentUser: User,
  ): Promise<Payment> {
    return this.paymentService.changeStatus(id, changeStatusDto, currentUser);
  }






}