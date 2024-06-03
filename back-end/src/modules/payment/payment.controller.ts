import { Controller, Get, Post, Body, Param, Put, Delete, Patch, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { FindAllResponsePaymentDto } from './dto/find-all-response-payment.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ChangePaymentStatusDto } from './dto/change-payment-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('payments')
@ApiTags('Payment')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentData: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(paymentData);
  }

  @Get()
  async findAll(): Promise<FindAllResponsePaymentDto> {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Payment> {
    return this.paymentService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.paymentService.delete(id);
  }

  @Patch(':id/add-receipt/:receiptId')
  @ApiOperation({ summary: 'Add receipt to a payment' })
  @ApiResponse({ status: 200, description: 'Receipt added successfully', type: Payment })
  async addReceipt(
    @Param('id') id: number,
    @Param('receiptId') receiptId: number,
  ): Promise<Payment> {
    return this.paymentService.addReceipt(id, receiptId);
  }

  @Patch(':id/change-status')
  @ApiOperation({ summary: 'Change the status of a payment' })
  @ApiResponse({ status: 200, description: 'Payment status changed successfully', type: Payment })
  async changeStatus(
    @Param('id') id: number,
    @Body('status') changeStatusDto: ChangePaymentStatusDto,
    @CurrentUser() currentUser: User,
  ): Promise<Payment> {
    return this.paymentService.changeStatus(id, changeStatusDto, currentUser);
  }
}