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
import { PermissionsGuard } from '../permission/guard/permissions.guard';
import { UserRoutePermissionEnum } from './entities/user-route-permission.enum';
import { Permissions } from '../permission/decorator/permissions.decorator';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UpdateUserMeDto } from './dto/update-user-me.dto';

@Controller('users')
@ApiTags('User')
@ApiBearerAuth('bearerAuth')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user admin' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: User,
  })
  @Permissions(UserRoutePermissionEnum.CAN_CREATE_USER)
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.adminCreate(createUserDto);
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
  @Permissions(UserRoutePermissionEnum.CAN_VIEW_USERS)
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<FindAllResponseDto<User>> {
    return this.userService.findAllCensored(page, limit);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current logged in user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user which is currently logged in',
    type: User,
  })
  findMe(@CurrentUser() currentUser: User) {
    return this.userService.findOneCensored(currentUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return the user with the specified ID',
    type: User,
  })
  @Permissions(UserRoutePermissionEnum.CAN_VIEW_USER)
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

  @Patch('me')
  @ApiOperation({ summary: 'Update current logged in user' })
  @ApiBody({ type: UpdateUserMeDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: User,
  })
  async updateMe(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserMeDto,
    @CurrentUser() currentUser: User,
  ): Promise<User> {
    return this.userService.updateUser(currentUser.id, updateUserDto, currentUser);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: User,
  })
  @Permissions(UserRoutePermissionEnum.CAN_UPDATE_USER)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User, // Use the CurrentUser decorator to access the current user
  ): Promise<User> {
    return this.userService.updateUser(+id, updateUserDto, currentUser);
  }

  @Delete('me')
  @ApiOperation({ summary: 'Delete logged in user account' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    type: DeleteResponseDto,
  })
  async removeMe(@CurrentUser() currentUser: User): Promise<DeleteResponseDto> {
    await this.userService.delete(currentUser.id);
    return new DeleteResponseDto();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    type: DeleteResponseDto,
  })
  @Permissions(UserRoutePermissionEnum.CAN_DELETE_USER)
  async remove(@Param('id') id: string): Promise<DeleteResponseDto> {
    await this.userService.delete(+id);
    return new DeleteResponseDto();
  }

  @Get('fuzzy-search/:term')
  @ApiOperation({ summary: 'Fuzzy search user by users ' })
  @ApiParam({ name: 'term', description: 'The term to search for' })
  @ApiResponse({
    status: 200,
    description: 'Array of users that match the search criteria',
    type: [User],
  })
  async fuzzySearch(@Param('term') term: string): Promise<User[]> {
    const users = await this.userService.fuzzySearch(term)
    const u = users.map((item) => plainToClass(User, item))
    return u;
  }
}
