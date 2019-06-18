import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UserSchema } from './user.schema';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secretOrPrivateKey: config.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {
}
