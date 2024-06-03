import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllResponseMaintenanceEquipmentDto } from './dto/find-all-response-maintenance_equipment.dto';
import { CreateMaintenanceEquipmentDto } from './dto/create-maintenance_equipment.dto';
import { UpdateMaintenanceEquipmentDto } from './dto/update-maintenance_equipment.dto';
import { MaintenanceEquipmentService } from './maintenance_equipment.service';
import { MaintenanceEquipment } from './entities/maintenance_equipment.entity';

@Controller('maintenance-requests/:maintenanceRequestId/maintenance-equipments')
@ApiTags('Maintenance Equipments')
export class MaintenanceEquipmentController {
  constructor(private readonly maintenanceEquipmentService: MaintenanceEquipmentService) {}

  @Post()
  async create(
    @Param('maintenanceRequestId') maintenanceRequestId: number,
    @Body() equipmentData: CreateMaintenanceEquipmentDto
  ): Promise<MaintenanceEquipment> {
    return this.maintenanceEquipmentService.create({
      ...equipmentData,
      maintenanceRequestId,
    });
  }

  @Get()
  async findAll(
    @Param('maintenanceRequestId') maintenanceRequestId: number
  ): Promise<FindAllResponseMaintenanceEquipmentDto> {
    return this.maintenanceEquipmentService.findWithPagination({
      where: { maintenanceRequest: { id: maintenanceRequestId } },
    });
  }

  @Get(':id')
  async findOne(
    @Param('maintenanceRequestId') maintenanceRequestId: number,
    @Param('id') id: number
  ): Promise<MaintenanceEquipment> {
    return this.maintenanceEquipmentService.findOne(id, {
      where: { maintenanceRequest: { id: maintenanceRequestId } },
    });
  }

  @Put(':id')
  async update(
    @Param('maintenanceRequestId') maintenanceRequestId: number,
    @Param('id') id: number,
    @Body() equipmentData: UpdateMaintenanceEquipmentDto
  ): Promise<MaintenanceEquipment> {
    const maintenanceRequest = await this.maintenanceEquipmentService.findOne(maintenanceRequestId);
    return this.maintenanceEquipmentService.update(id, {
      ...equipmentData,
      maintenanceRequest,
    });
  }

  @Delete(':id')
  async delete(
    @Param('maintenanceRequestId') maintenanceRequestId: number,
    @Param('id') id: number
  ): Promise<void> {
    return this.maintenanceEquipmentService.delete(id);
  }
}