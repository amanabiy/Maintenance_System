import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { GenericDAL } from '../../DAL/dal';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../auth/dto/login.user.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import FindAllResponseDto from 'src/dto/find-all-response.dto';

@Injectable()
export class UserService extends GenericDAL<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await this.hashPassword(dto.password);
    dto.password = hashedPassword;

    const createdUser = super.create(dto);
    return plainToInstance(User, createdUser);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    // Hash the password before updating the user
    if (dto.password) {
      const hashedPassword = await this.hashPassword(dto.password);
      dto.password = hashedPassword;
      dto.lastPasswordUpdatedAt = new Date();
    }
    const result = super.update(id, dto);
    return plainToInstance(User, result);
  }

  async findAll(
    page: number,
    pageSize: number,
  ): Promise<FindAllResponseDto<User>> {
    const result = await super.findAll(page, pageSize);
    result.items = result.items.map((item) => plainToClass(User, item));
    return result;
  }

  async findOne(
    id: number,
    options: FindOneOptions = { where: {} },
  ): Promise<User | undefined> {
    const result = await super.findOne(id, options);
    return plainToClass(User, result);
  }

  private hashPassword(password: string): Promise<string> {
    const saltOrRounds = 12;
    return bcrypt.hash(password, saltOrRounds);
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async authenticateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    try {
      const user: User = await super.findOne(-1, { where: { email } });
      const isValidPassword = await this.validatePassword(
        password,
        user.password,
      );
      if (!isValidPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return plainToInstance(User, user);
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
