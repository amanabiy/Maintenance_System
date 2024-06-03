import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { UserService } from 'src/modules/user/user.service';
import { Payment } from './entities/payment.entity';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';

@Injectable()
export class PaymentService extends GenericDAL<Payment, CreatePaymentDto, UpdatePaymentDto> {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly userService: UserService,
    private readonly maintenanceRequestService: MaintenanceRequestService,
    // private readonly requestService: RequestService,
    // private readonly equipmentService: EquipmentService,
  ) {
    super(paymentRepository, 1, 10, [
      'user',
      'request',
      'equipment'
    ]);
  }

  async create(paymentData: CreatePaymentDto): Promise<Payment> {
    const { 
      userId,
      requestId,
      ...rest
      // equipmentId
    } = paymentData;

    const user = await this.userService.findOne(userId);
    let request = null;
    if (requestId) {
      request = await this.maintenanceRequestService.findOne(requestId);
    }

    // let equipment = null;
    // if (equipmentId) {
    //   equipment = await this.equipmentService.findOne(equipmentId);
    //   if (!equipment) {
    //     throw new Error('Equipment not found');
    //   }
    // }

    
    const payment = await super.create({
      ...request,
      user,
      request
    })

    return payment;
  }

}