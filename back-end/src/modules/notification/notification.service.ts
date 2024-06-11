import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification, NotificationTypeEnum } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { MaintenanceRequest } from 'src/modules/maintenance_request/entities/maintenance_request.entity';
import { GenericDAL } from 'src/DAL/dal';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FindAllResponseNotificationDto } from './dto/find-all-response-notification';
import { UserService } from '../user/user.service';
import { MaintenanceRequestService } from '../maintenance_request/maintenance_request.service';

@Injectable()
export class NotificationService extends GenericDAL<Notification, CreateNotificationDto, UpdateNotificationDto> {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => MaintenanceRequestService))
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    super(notificationRepository, 1, 100);
  }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const { userId, maintenanceRequestId, ...rest } = createNotificationDto;

    const user = await this.userService.findOne(userId);
    const maintenanceRequest = maintenanceRequestId 
      ? await this.maintenanceRequestService.findOne(maintenanceRequestId) 
      : null;

    const notification = await super.create({
      ...rest,
      user,
      maintenanceRequest,
    });

    return notification;
  }

  async getNotificationsForUser(userId: number, isRead?: boolean): Promise<FindAllResponseNotificationDto> {
    console.log(userId, isRead)
    const whereConditions: any = { user: { id: userId } };
    
    if (isRead !== undefined) {
      whereConditions.isRead = isRead;
    }
    
    console.log(whereConditions);
    const result = await this.findWithPagination({
      where: whereConditions,
    });
    console.log(result);
    return result;
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.isRead = true;
    return this.update(notification.id, notification);
  }

  async markAllAsRead(userId: number): Promise<void> {
    await this.notificationRepository.update({ user: { id: userId } }, { isRead: true });
  }

  async markAsUnread(id: number): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.isRead = false;
    return this.update(notification.id, notification);
  }

  async deleteAllForMaintenanceRequest(maintenanceRequestId: number): Promise<void> {
    await this.notificationRepository.delete({ maintenanceRequest: { id: maintenanceRequestId } });
  }


  async createPaymentRequestNotification(userId: number, maintenanceRequestId: number): Promise<Notification> {
    const createNotificationDto: CreateNotificationDto = {
      type: NotificationTypeEnum.REQUEST_UPDATE,
      subject: 'Payment Request for Maintenance Task',
      message: `Please pay and attach the receipt for the maintenance task with ID: ${maintenanceRequestId}.`,
      userId,
      maintenanceRequestId,
    };
    return this.create(createNotificationDto);
  }

  async createStatusChangeNotification(userId: number, maintenanceRequestId: number, oldStatus: string, newStatus: string, link: string): Promise<Notification> {
    const createNotificationDto: CreateNotificationDto = {
      type: NotificationTypeEnum.REQUEST_UPDATE,
      subject: `Status Change Notification: ${oldStatus} to ${newStatus}`,
      message: `The status of your request with ID: ${maintenanceRequestId} has changed from ${oldStatus} to ${newStatus}. Please check the following link for more details: ${link}`,
      userId,
      maintenanceRequestId,
    };
    return this.create(createNotificationDto);
  }

  async createAssignmentNotification(userId: number, maintenanceRequestId: number): Promise<Notification> {
    const createNotificationDto: CreateNotificationDto = {
      type: NotificationTypeEnum.REQUEST_UPDATE,
      subject: 'Maintenance Request Assigned',
      message: `A maintenance request with ID: ${maintenanceRequestId} has been assigned to you.`,
      userId,
      maintenanceRequestId,
    };

    return this.create(createNotificationDto);
  }
}