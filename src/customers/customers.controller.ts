import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customer.dto';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-object-id.pipe';

@ApiUseTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {
  }

  @Get()
  @ApiOperation({title: 'Get customers list'})
  @ApiOkResponse({ description: 'Retrieve a list of all customers.'})
  async getAllCustomers() {
    return await this.service.getAllCustomers();
  }

  @Get(':id')
  @ApiOperation({title: 'Get one customer by ID'})
  @ApiOkResponse({description: 'Returns a customer'})
  @ApiNotFoundResponse({description: 'Customer not found for given ID'})
  async getCustomer(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.getCustomer(id);

    if (!found) {
      throw new NotFoundException(`Customer with ID [${id}] not found.`);
    }

    return found;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addCustomer(@Body() dto: CustomerDto) {
    return await this.service.addCustomer(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateCustomer(@Param('id', new ValidateObjectIdPipe()) id: string, @Body() dto: CustomerDto) {
    const found = await this.service.updateCustomer(id, dto);

    if (!found) {
      throw new NotFoundException(`Customer with ID [${id}] not found.`);
    }

    return found;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  async deleteCustomer(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.deleteCustomer(id);

    if (!found) {
      throw new NotFoundException(`Customer with ID [${id}] not found.`);
    }
  }
}
