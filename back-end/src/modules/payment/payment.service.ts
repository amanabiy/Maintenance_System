import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserService } from 'src/modules/user/user.service';
import { Payment } from './entities/payment.entity';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';
import { MediaService } from '../media/media.service';
import { PaymentStatus } from './entities/payment_status.enum';
import { User } from '../user/entities/user.entity';
import { ChangePaymentStatusDto } from './dto/change-payment-status.dto';
import { FindAllResponsePaymentDto } from './dto/find-all-response-payment.dto';

@Injectable()
export class PaymentService extends GenericDAL<Payment, CreatePaymentDto, UpdatePaymentDto> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UserService,
    private readonly maintenanceRequestService: MaintenanceRequestService,
    private readonly mediaService: MediaService,
  ) {
    super(paymentRepository, 1, 1000, [
      // 'user',
      // 'request',
      // 'equipment'
    ]);
  }

  async create(paymentData: CreatePaymentDto): Promise<Payment> {
    const { 
      userId,
      requestId,
      ...rest
    } = paymentData;

    const user = await this.userService.findOne(userId);
    let request = null;
    if (requestId) {
      request = await this.maintenanceRequestService.findOne(requestId);
    }

    
    const payment = await super.create({
      ...rest,
      user,
      request
    })

    return payment;
  }

  async addReceipt(paymentId: number, receiptId: number, currentUser: User): Promise<Payment> {
    const payment = await this.findOne(paymentId);
    const receipt = await this.mediaService.findOne(receiptId);

    if (payment.user.id !== currentUser.id) {
      throw new ForbiddenException('The user who is requested to pay is the only one who can attach receipt');
    }

    payment.receipt = receipt;
    payment.receiptApprovalStatus = PaymentStatus.PENDING;

    return await this.update(payment.id, payment);
  }

  async changeStatus(paymentId: number, changePaymentStatusDto: ChangePaymentStatusDto, currentUser: User): Promise<Payment> {
    const payment = await this.findOne(paymentId);

    payment.receiptApprovalStatus = changePaymentStatusDto.status;
    payment.receiptApprovedBy = currentUser;
    payment.receiptComment = changePaymentStatusDto.comment;

    return await this.update(payment.id, payment);
  }

  async filterPaymentsByStatus(user: User, status: PaymentStatus): Promise<FindAllResponsePaymentDto> {
    const where = {
      user: { id: user.id },
    }

    if (status) {
      where['receiptApprovalStatus'] = status;
    }

    return this.findWithPagination({
      where,
    });
  }

  async filterPayments(
    currentUser: User,
    status?: PaymentStatus,
    userId?: number,
    maintenanceRequestId?: number,
  ): Promise<FindAllResponsePaymentDto> {
    const where: any = {};

    if (userId) {
      where.user = { id: userId };
    }

    if (status) {
      where.receiptApprovalStatus = status;
    }

    if (maintenanceRequestId) {
      where.request = { id: maintenanceRequestId };
    }
  
    console.log(where);
    
    return await this.findWithPagination({
      where,
      // relations: ['receipt', 'user', 'request'],
    });
  }
}