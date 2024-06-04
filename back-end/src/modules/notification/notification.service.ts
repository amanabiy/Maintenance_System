import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
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
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    super(notificationRepository, 1, 100, ['user', 'maintenanceRequest']);
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
  
    return this.findWithPagination({
      where: whereConditions,
    });
  }

  async markAsRead(id: number): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.isRead = true;
    return this.update(notification.id, notification);
  }
}