import { ApiModelProperty } from '@nestjs/swagger';

export class CustomerDto {
  @ApiModelProperty()
  readonly firstName: string;
  @ApiModelProperty()
  readonly lastName: string;
  @ApiModelProperty()
  readonly email: string;
  @ApiModelProperty()
  readonly phone: string;
  @ApiModelProperty()
  readonly address: string;
  readonly createdAt: Date;
}
