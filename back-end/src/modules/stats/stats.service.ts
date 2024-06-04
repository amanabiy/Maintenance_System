import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaintenanceEquipment } from 'src/modules/maintenance_equipment/entities/maintenance_equipment.entity';
import { GetStatsDto, GroupByEnum } from './dto/get-stat_with_date.dto';
import { MaintenanceRequest } from '../maintenance_request/entities/maintenance_request.entity';
import { User } from '../user/entities/user.entity';
import { RequestStatusTime } from '../request_status_time/entities/request_status_time.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(MaintenanceEquipment)
    private readonly maintenanceEquipmentRepository: Repository<MaintenanceEquipment>,
    @InjectRepository(MaintenanceRequest)
    private readonly maintenanceRequestRepository: Repository<MaintenanceRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RequestStatusTime)
    private readonly requestStatusTimeRepository: Repository<RequestStatusTime>,
  ) {}

  async getEquipmentsUsedByCategory(startDate: string, endDate: string): Promise<any> {
    const result = await this.maintenanceEquipmentRepository
      .createQueryBuilder('equipment')
      .select('equipment.category', 'category')
      .addSelect('COUNT(equipment.id)', 'count')
      .where('equipment.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('equipment.category')
      .getRawMany();
    return result;
  }

  async getEquipmentsUsedByModel(startDate: string, endDate: string): Promise<any> {
    const result = await this.maintenanceEquipmentRepository
      .createQueryBuilder('equipment')
      .select('equipment.model', 'model')
      .addSelect('COUNT(equipment.id)', 'count')
      .where('equipment.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('equipment.model')
      .getRawMany();
    return result;
  }

  private getDateFormat(groupBy: GroupByEnum): string {
    switch (groupBy) {
      case GroupByEnum.DAY:
        return '%Y-%m-%d';
      case GroupByEnum.WEEK:
        return '%Y-%u'; // Week number
      case GroupByEnum.MONTH:
        return '%Y-%m';
      case GroupByEnum.YEAR:
        return '%Y';
      default:
        throw new Error('Invalid groupBy value');
    }
  }

  private constructQuery(
    dateFormat: string,
    startDate: string,
    endDate: string,
    maintenanceRequestTypeId?: number,
  ) {
    const query = this.maintenanceRequestRepository
      .createQueryBuilder('maintenanceRequest')
      .select(`DATE_FORMAT(maintenanceRequest.createdAt, '${dateFormat}')`, 'period')
      .addSelect('COUNT(*)', 'count')
      .where('maintenanceRequest.createdAt BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('period')
      .orderBy('period');

    if (maintenanceRequestTypeId) {
      query.andWhere('maintenanceRequest.maintenanceRequestTypeId = :maintenanceRequestTypeId', { maintenanceRequestTypeId });
    }

    return query;
  }

  async getMaintenanceStats(
    getStat: GetStatsDto,
    maintenanceRequestTypeId?: number,
  ): Promise<any[]> {
    const { startDate, endDate, groupBy } = getStat;
    const dateFormat = this.getDateFormat(groupBy);
    const query = this.constructQuery(dateFormat, startDate, endDate, maintenanceRequestTypeId);
    const result = await query.getRawMany();
    return result;
  }

  async getUserStatsByRole(): Promise<any> {
    const query = this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.role', 'role')
      .select('role.roleName', 'roleName')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('role.id');

    return query.getRawMany();
  }

  async getUserStatsByDepartment(): Promise<any> {
    const query = this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.department', 'department')
      .select('department.name', 'departmentName')
      .addSelect('COUNT(user.id)', 'count')
      .groupBy('department.id');

    return query.getRawMany();
  }

  async getTimeSpentByStage(startDate?: string, endDate?: string): Promise<any[]> {
    const query = await this.requestStatusTimeRepository
      .createQueryBuilder('rst')
      .select('rst.fromStatusType', 'fromStatusType')
      .addSelect('SUM(rst.timeSpent)', 'totalSumTimeInMillisecond')
      

      if (startDate) {
        query.andWhere('rst.createdAt >= :startDate', { startDate: startDate });
      }
  
      if (endDate) {
        query.andWhere('rst.createdAt <= :endDate', { endDate: endDate });
      }
    
    const result = await query.groupBy('rst.fromStatusType').getRawMany();

    return result;
  }
}