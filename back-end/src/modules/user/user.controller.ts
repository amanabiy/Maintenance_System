import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { DeleteResponseDto } from 'src/dto/delete-response.dto';
import FindAllResponseDto from 'src/dto/find-all-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles-guard';
import { FindAllResponseUserDto } from './dto/find-all-response-user.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRoleEnum } from './entities/user-role.enum';

@Controller('users')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearerAuth')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all users',
    type: FindAllResponseUserDto,
  })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  // @Roles(UserRoleEnum.USER) // Role decorator
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<FindAllResponseDto<User>> {
    return this.userService.findAllCensored(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user with the specified ID',
    type: User,
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOneCensored(+id);
  }

  // @Post('search')
  // @ApiOperation({ summary: 'Search users' })
  // @ApiBody({ type: UpdateUserDto })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: 'Return users based on search criteria',
  //   type: [User] // Specify the response type
  // })
  // searchUsers(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Query('page') page = 1,
  //   @Query('limit') limit = 10,)
  // {
  //   return this.userService.searchUsers(updateUserDto, +page, +limit);
  // }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: User,
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User, // Use the CurrentUser decorator to access the current user
  ): Promise<User> {
    console.log(
      'Logging the current user to avoid linting problem',
      currentUser,
    );
    return this.userService.updateUser(+id, updateUserDto, currentUser);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    type: DeleteResponseDto,
  })
  // @Roles('ADMIN') //use @Roles to add roles to determine which roles have access to this route
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.userService.delete(+id);
    return new DeleteResponseDto();
  }
}
