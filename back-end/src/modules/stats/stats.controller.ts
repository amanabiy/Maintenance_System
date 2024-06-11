import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { GetStatsDto } from './dto/get-stat_with_date.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles-guard';
import { PermissionsGuard } from '../permission/guard/permissions.guard';
import { Permissions } from '../permission/decorator/permissions.decorator';
import { StatsPermissionEnum } from './entities/stat.permission.enum';

@ApiTags('Stats')
@Controller('stats')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@ApiBearerAuth('bearerAuth')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('equipments-used-by-category')
  @ApiOperation({ summary: 'Get equipments used by category within a date range (one graph)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_EQUIPMENTS_USED_BY_CATEGORY)
  async getEquipmentsUsedByCategory(@Query() getStatsDto: GetStatsDto): Promise<any> {
    return this.statsService.getEquipmentsUsedByCategory(getStatsDto.startDate, getStatsDto.endDate);
  }

  @Get('equipments-used-by-model')
  @ApiOperation({ summary: 'Get equipments used by model within a date range (one graph)' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_EQUIPMENTS_USED_BY_MODEL)
  async getEquipmentsUsedByModel(@Query() getStatsDto: GetStatsDto): Promise<any> {
    return this.statsService.getEquipmentsUsedByModel(getStatsDto.startDate, getStatsDto.endDate);
  }

  @Get('maintenance-count')
  @ApiOperation({ summary: 'Get the number of maintenance requests within a date range, aggregated by period (one for all maintenance, and can filter for each type one graph)' })
  @ApiQuery({ name: 'maintenanceRequestTypeId', required: false })
  @ApiResponse({ status: 200, description: 'Number of maintenance requests within the date range' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_MAINTENANCE_COUNT)
  async getMaintenanceStats(
    @Query() getStat: GetStatsDto,
    @Query('maintenanceRequestTypeId') maintenanceRequestTypeId?: number,
  ): Promise<any[]> {
    return this.statsService.getMaintenanceStats(getStat, maintenanceRequestTypeId);
  }

  @Get('users/by-role')
  @ApiOperation({ summary: 'Get user stats by role' })
  @ApiResponse({ status: 200, description: 'User stats by role retrieved successfully' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_USER_STATS_BY_ROLE)
  async getUserStatsByRole(): Promise<any> {
    const result = await this.statsService.getUserStatsByRole();
    return result;
  }

  @Get('users/by-department')
  @ApiOperation({ summary: 'Get user stats by department' })
  @ApiResponse({ status: 200, description: 'User stats by department retrieved successfully' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_USER_STATS_BY_DEPARTMENT)
  async getUserStatsByDepartment(): Promise<any> {
    return await this.statsService.getUserStatsByDepartment();
  }

  @Get('time-spent-by-stage')
  @ApiOperation({ summary: 'Get time spent by stage' })
  @ApiQuery({ name: 'startDate', required: false, type: String, example: '2024-01-01' })
  @ApiQuery({ name: 'endDate', required: false, type: String, example: '2024-12-31' })
  @ApiResponse({ status: 200, description: 'Time spent by stage retrieved successfully' })
  // @Permissions(StatsPermissionEnum.CAN_VIEW_TIME_SPENT_BY_STAGE)
  async getTimeSpentByStages(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ): Promise<any[]> {
    return this.statsService.getTimeSpentByStage(startDate, endDate);
  }
}