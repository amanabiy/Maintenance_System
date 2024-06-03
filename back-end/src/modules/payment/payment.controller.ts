import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { FindAllResponsePaymentDto } from './dto/find-all-response-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
@ApiTags('Payment')
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

  @Put(':id')
  async update(@Param('id') id: number, @Body() paymentData: Partial<Payment>): Promise<Payment> {
    return this.paymentService.update(id, paymentData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.paymentService.delete(id);
  }
}