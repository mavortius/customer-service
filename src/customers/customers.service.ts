import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './customer.interface';
import { Model } from 'mongoose';
import { CustomerDto } from './customer.dto';

@Injectable()
export class CustomersService {
  constructor(@InjectModel('Customer') private readonly model: Model<Customer>) {
  }

  async getAllCustomers(): Promise<Customer[]> {
    return await this.model.find().exec();
  }

  async getCustomer(id: string): Promise<Customer> {
    return await this.model.findById(id).exec();
  }

  async addCustomer(dto: CustomerDto): Promise<Customer> {
    return await new this.model(dto).save();
  }

  async updateCustomer(id: string, dto: CustomerDto): Promise<Customer> {
    return await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteCustomer(id: string): Promise<Customer> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
