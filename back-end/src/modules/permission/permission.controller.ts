import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { FindAllResponsePermissionDto } from './dto/find-all-response-permission.dto';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  findAll(): Promise<FindAllResponsePermissionDto> {
    return this.permissionService.findAll();
  }
}
