import { Controller, Post, Body, HttpStatus, BadRequestException, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { User } from '../user/entities/user.entity';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { MessageResponseDto } from 'src/dto/message-response.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: User,
  })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    return this.authService.login(loginUserDto);
  }

  @Post('verify-email/:token')
  @ApiOperation({ summary: 'Verify email' })
  @ApiParam({ name: 'token', description: 'Email verification token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verified successfully',
    type: MessageResponseDto,
  })
  async verifyEmail(@Param('token') token: string): Promise<MessageResponseDto> {
    const result = await this.authService.verifyEmail(token);
    if (!result) {
      throw new BadRequestException('Invalid token');
    }
    return { message: 'Email verified successfully' };
  }

  @Post('request-otp/:email')
  @ApiOperation({ summary: 'Request OTP for password reset' })
  @ApiParam({ name: 'email', description: 'Email address of the user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP sent successfully',
    type: MessageResponseDto,
  })
  async requestOtp(@Param('email') email: string): Promise<MessageResponseDto> {
    await this.authService.requestOtp(email);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP and reset password' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully',
    type: MessageResponseDto,
  })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<MessageResponseDto> {
    await this.authService.verifyOtp(verifyOtpDto.email, verifyOtpDto.otp, verifyOtpDto.newPassword);
    return { message: 'Password reset successfully' };
  }
}
