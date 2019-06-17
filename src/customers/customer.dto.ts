import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @ApiModelProperty()
  readonly lastName: string;

  @IsEmail()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @ApiModelProperty()
  readonly phone: string;

  @ApiModelProperty()
  @IsString()
  readonly address: string;

  readonly createdAt?: Date;
}
