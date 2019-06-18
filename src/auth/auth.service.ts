import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from './user.interface';
import { SigninData } from './signin-data.interface';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) {
  }

  async singIn(data: SigninData): Promise<any> {
    const user = await this.usersService.getUserByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { user_id: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  async register(user: User): Promise<User> {
    return this.usersService.addUser(user);
  }

  async validate(payload: JwtPayload): Promise<User> {
    return await this.usersService.getUser(payload.user_id);
  }
}
