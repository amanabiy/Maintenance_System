import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login.user.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: AuthRegisterDto): Promise<User> {
    return this.userService.create(createUserDto as CreateUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const user: User = await this.userService.authenticateUser(loginUserDto);
    const payload = {
      email: user.email,
      userId: user.id,
      lastPasswordUpdatedAt: user.lastPasswordUpdatedAt,
    };
    const accessToken = this.jwtService.sign(payload);
    const response: AuthResponseDto = {
      accessToken,
      user,
    };
    return response;
  }
}
