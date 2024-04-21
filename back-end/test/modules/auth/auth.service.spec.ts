import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserRole } from 'src/modules/user/entities/user-role.enum';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        role: UserRole.USER,
      };
      const createdUser: User = {
        ...createUserDto,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastPasswordUpdatedAt: new Date(),
      };

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
      // jest.spyOn(service, 'hashPassword').mockResolvedValue('hashedPassword');
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(createdUser);
    });
  });

  // Add more test cases for other methods as needed
});
