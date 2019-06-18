import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  readonly phone: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  readonly createdAt?: Date;
}
