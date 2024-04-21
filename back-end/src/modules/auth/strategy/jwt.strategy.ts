import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any): Promise<User> {
    try {
      const user = await this.userService.findOne(payload['userId']);
      if (payload.lastPasswordUpdatedAt !== user.lastPasswordUpdatedAt.toISOString()) {
        throw new UnauthorizedException('Password have changed'); // this is not shown for the user (only Invalid credentials is)
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
