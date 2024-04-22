import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { FindAllResponseLocationDto } from './dto/find-all-response-location.dto';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import { Location } from './entities/location.entity';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The location has been successfully created', type: Location })
  @ApiBadRequestResponse({ description: 'Invalid data provided for location creation' })
  async create(@Body() createLocationDto: CreateLocationDto): Promise<Location> {
    return await this.locationService.create({... createLocationDto} as any);
  }

  @Get()
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved all locations successfully', type: FindAllResponseLocationDto })
  async findAll(): Promise<FindAllResponseDto<Location>> {
    return await this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Retrieved location successfully', type: Location })
  @ApiNotFoundResponse({ description: 'Location with the specified ID not found' })
  async findOne(@Param('id') id: string): Promise<Location> {
    return await this.locationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Location has been successfully updated', type: Location })
  @ApiNotFoundResponse({ description: 'Location with the specified ID not found' })
  async update(@Param('id') id: string, @Body() updateLocationDto: UpdateLocationDto): Promise<Location> {
    return await this.locationService.update(+id, updateLocationDto as any);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete location by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Location has been successfully deleted', type: DeleteResponseDto })
  @ApiNotFoundResponse({ description: 'Location with the specified ID not found' })
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.locationService.delete(+id);
    return new DeleteResponseDto();
  }
}
