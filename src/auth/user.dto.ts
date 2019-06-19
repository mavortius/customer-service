import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from './user.interface';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;

  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly fullName: string;

  @IsNotEmpty()
  @ApiModelProperty()
  readonly roles: Role[];
}
