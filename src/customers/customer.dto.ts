import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from './customer.interface';

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

  @IsEnum(Genre)
  @IsNotEmpty()
  @ApiModelProperty()
  readonly genre: Genre;

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
