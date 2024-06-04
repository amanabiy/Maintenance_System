import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';
import { FindAllResponseNotificationDto } from './dto/find-all-response-notification';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('bearerAuth')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Notification created successfully', type: Notification })
  async create(@Body() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all notifications' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all notifications successfully', type: FindAllResponseNotificationDto })
  async findAll(): Promise<FindAllResponseNotificationDto> {
    return this.notificationService.findAll();
  }

  @Get('logged-in-user')
  @ApiOperation({ summary: 'Retrieve notifications for a user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved notifications for user successfully', type: FindAllResponseNotificationDto })
  async getNotificationsForUser(
    @CurrentUser() currentUser: User,
    @Query('isRead') isRead?: boolean,
  ): Promise<FindAllResponseNotificationDto> {
    return this.notificationService.getNotificationsForUser(currentUser.id, isRead);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a notification by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved notification successfully', type: Notification })
  async findOne(@Param('id') id: number): Promise<Notification> {
    return this.notificationService.findOne(id);
  }

  @Patch(':id/mark-as-read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Notification marked as read successfully', type: Notification })
  async markAsRead(@Param('id') id: number): Promise<Notification> {
    return this.notificationService.markAsRead(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a notification by ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Notification deleted successfully' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.notificationService.delete(id);
  }
}