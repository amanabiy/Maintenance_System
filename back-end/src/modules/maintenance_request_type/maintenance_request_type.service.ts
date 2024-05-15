import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericDAL } from 'src/DAL/dal';
import { Like, Repository } from 'typeorm';
import { MaintenanceRequestType } from './entities/maintenance_request_type.entity';
import { CreateMaintenanceRequestTypeDto } from './dto/create-maintenance_request_type.dto';
import { UpdateMaintenanceRequestTypeDto } from './dto/update-maintenance_request_type.dto';

@Injectable()
export class MaintenanceRequestTypeService extends GenericDAL<
  MaintenanceRequestType,
  CreateMaintenanceRequestTypeDto,
  UpdateMaintenanceRequestTypeDto
> {
  constructor(
    @InjectRepository(MaintenanceRequestType)
    private readonly maintenanceRequestTypeRepository: Repository<MaintenanceRequestType>,
  ) {
    super(maintenanceRequestTypeRepository);
  }

  async fuzzySearch(term: string): Promise<MaintenanceRequestType[]> {
    return await this.find({
      where: [
        { name: Like(`%${term}%`) },
        { description: Like(`%${term}%`) },
      ],
    });
  }
}
