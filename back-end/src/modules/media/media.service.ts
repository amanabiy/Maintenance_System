import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import { User } from '../user/entities/user.entity';
import { Express } from 'express';
import { promises as fsPromises } from 'fs';
import { GenericDAL } from 'src/DAL/dal';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Injectable()
export class MediaService extends GenericDAL<Media, CreateMediaDto, UpdateMediaDto> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {
    super(mediaRepository);
  }

  async saveMedia(file: Express.Multer.File, uploadedBy: User | null): Promise<Media> {
    const mediaDto: CreateMediaDto = {
      filename: file.filename,
      mimetype: file.mimetype,
      path: file.path,
      uploadedBy: uploadedBy,
    };
    return this.create(mediaDto);
  }

  async remove(id: number, uploadedBy: User | null): Promise<void> {
    const media = await this.findOne(id);
    if (uploadedBy && media.uploadedBy && media.uploadedBy.id !== uploadedBy.id) {
      throw new ForbiddenException(`You do not have permission to delete this media`);
    }

    try {
      await fsPromises.unlink(media.path);
    } catch (error) {
      throw new Error(`Failed to delete file at path ${media.path}: ${error.message}`);
    }

    await this.delete(id);
  }

  async getMediaPath(id: number, uploadedBy: User | null): Promise<string> {
    const media = await this.findOne(id);
    return media.path;
  }

  async findAllByUser(uploadedBy: User | null): Promise<Media[]> {
    if (uploadedBy) {
      return this.mediaRepository.find({ where: { uploadedBy } });
    } else {
      return this.mediaRepository.find();
    }
  }
}
