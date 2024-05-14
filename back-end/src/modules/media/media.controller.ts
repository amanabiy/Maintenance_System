import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  HttpStatus,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { Media } from './entities/media.entity';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import * as path from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import FindAllResponseDto from 'src/dto/find-all-response.dto';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a media file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The media has been successfully uploaded.',
    type: Media,
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const filename: string = uuidv4() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Media> {
    return this.mediaService.saveMedia(file, null);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all media files' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved all media files',
    type: [Media],
  })
  async findAll(): Promise<FindAllResponseDto<Media>> {
    return await this.mediaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a media file by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved the media file',
    type: Media,
  })
  async findOne(@Param('id') id: number): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @Get('download/:id')
  @ApiOperation({ summary: 'Download a media file by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Downloaded the media file',
  })
  async downloadMedia(@Param('id') id: number, @Res() res: Response) {
    const media = await this.mediaService.findOne(id);
    res.download(media.path, media.filename);
  }

  @Get('serve/:id')
  @ApiOperation({ summary: 'Serve a media file by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media file' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Served the media file',
  })
  async serveMedia(@Param('id') id: number, @Res() res: Response) {
    const media = await this.mediaService.findOne(id);
    res.setHeader('Content-Type', media.mimetype);
    res.sendFile(media.path, { root: '.' });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a media file by ID' })
  @ApiParam({ name: 'id', description: 'ID of the media file' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleted the media file',
  })
  async remove(@Param('id') id: number): Promise<void> {
    await this.mediaService.remove(id, null);
  }
}
