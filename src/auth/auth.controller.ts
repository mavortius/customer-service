import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.interface';
import { SigninData } from './signin-data.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: SigninData) {
    return this.auth.singIn(data);
  }

  @Post('register')
  async register(@Body() user: User) {
    return this.auth.register(user);
  }
}
