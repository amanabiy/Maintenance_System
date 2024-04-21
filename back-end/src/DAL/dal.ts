import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';

export class GenericDAL<Entity, DTO, UpdateDTO> {
  entityName: string;
  constructor(
    private readonly repository: Repository<Entity>,
    private readonly defaultSkip: number = 0,
    private readonly defaultTake: number = 1,
  ) {
    this.entityName = repository.metadata.name;
  }

  private applyPagination(
    options: any,
    page?: number,
    pageSize?: number,
  ): void {
    if ((page && page <= 0) || (pageSize && pageSize <= 0)) {
      throw new BadRequestException(
        'Invalid page or limit. both should be above zero.',
      );
    }
    if (page && pageSize) {
      options.skip = (page - 1) * pageSize;
      options.take = pageSize;
    } else {
      options.skip = this.defaultSkip;
      options.take = this.defaultTake;
    }
  }

  async create(dto: DeepPartial<Entity>): Promise<Entity> {
    try {
      const entity = this.repository.create(dto as DeepPartial<Entity>);
      return await this.repository.save(entity);
    } catch (error) {
      throw new HttpException(
        `Error creating ${this.entityName}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<FindAllResponseDto<Entity>> {
    try {
      const options: any = {};
      this.applyPagination(options, page, pageSize);

      const [items, total] = await this.repository.findAndCount(options);
      return new FindAllResponseDto<Entity>(page, pageSize, total, items);
    } catch (error) {
      throw new HttpException(
        `Error fetching ${this.entityName}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(
    id: number,
    options: FindOneOptions = { where: {} },
  ): Promise<Entity | undefined> {
    try {
      options['where']['id'] = id;
      if (id == -1) {
        delete options['where']['id'];
      }
      const result = await this.repository.findOne(options);
      if (!result) {
        throw new NotFoundException(
          `No ${this.entityName} found with id ${id}`
        );
      }
      return result;
    } catch (error) {
      throw new HttpException(
        `Error fetching ${this.entityName} with id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, dto: DeepPartial<Entity>): Promise<Entity | undefined> {
    try {
      const entityToUpdate = await this.findOne(id);
      const updatedEntity = { ...entityToUpdate, ...dto } as Entity;
      await this.repository.save(updatedEntity);
      return this.findOne(id);
    } catch (error) {
      throw new HttpException(
        `Error updating ${this.entityName} with id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        throw new HttpException(
          `No ${this.entityName} found with id ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(
        `Error deleting ${this.entityName} with id ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(conditions: FindManyOptions<Entity>): Promise<Entity[]> {
    try {
      const result = await this.repository.find(conditions);
      return result
    } catch (error) {
      throw new HttpException(
        `Error fetching ${this.entityName}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findWithPagination(
    conditions?: FindManyOptions<Entity>,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<FindAllResponseDto<Entity>> {
    try {
      const options: FindManyOptions = conditions || {};
      this.applyPagination(options, page, pageSize);

      const [items, total] = await this.repository.findAndCount(options);
      return new FindAllResponseDto<Entity>(page, pageSize, total, items);
    } catch (error) {
      throw new HttpException(
        `Error fetching ${this.entityName}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
