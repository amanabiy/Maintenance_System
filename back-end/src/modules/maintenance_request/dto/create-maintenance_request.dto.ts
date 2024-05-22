import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, IsInt } from 'class-validator';
import { CreateLocationDto } from 'src/modules/location/dto/create-location.dto';

export class CreateMaintenanceRequestDto {
  @ApiProperty({
    description: 'The subject of the maintenance request',
    example: 'Leaking Pipe in Bathroom',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'The description of the maintenance request (Markdown)',
    example: 'There is a leaking pipe in the bathroom that needs urgent repair.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The location of the maintenance request',
    type: CreateLocationDto,
  })
  @IsNotEmpty()
  locationCreate: CreateLocationDto;

  @ApiProperty({
    description: 'The IDs of maintenance request types associated with this request',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  maintenanceRequestTypeIds: number[];

  @ApiProperty({
    description: 'The IDs of media files associated with this maintenance request',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  mediaIds: number[];

  @ApiProperty({
    description: 'The priority of the request, by default it is -1',
    example: 0,
    default: -1,
  })
  @IsInt()
  @IsOptional()
  priority: number;
}
