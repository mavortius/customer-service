import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customer.dto';
import { ValidateObjectIdPipe } from '../shared/pipes/validate-object-id.pipe';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Customer } from './customer.interface';
import { type } from 'os';

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
  async addCustomer(@Body() dto: CustomerDto) {
    return await this.service.addCustomer(dto);
  }

  @Put(':id')
  async updateCustomer(@Param('id', new ValidateObjectIdPipe()) id: string, @Body() dto: CustomerDto) {
    const found = await this.service.updateCustomer(id, dto);

    if (!found) {
      throw new NotFoundException(`Customer with ID [${id}] not found.`);
    }

    return found;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCustomer(@Param('id', new ValidateObjectIdPipe()) id: string) {
    const found = await this.service.deleteCustomer(id);

    if (!found) {
      throw new NotFoundException(`Customer with ID [${id}] not found.`);
    }
  }
}
