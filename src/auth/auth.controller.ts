import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.interface';
import { SigninData } from './signin-data.interface';
import { UserDto } from './user.dto';
import { Roles } from './roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {
  }

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() data: SigninData): Promise<any> {
    return this.auth.singIn(data);
  }

  @Post('sign-up')
  @Roles('ADMINISTRATOR')
  async signUp(@Body() user: UserDto): Promise<User> {
    return this.auth.signUp(user);
  }
}
