import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly model: Model<User>) {
  }

  async getAllUsers(): Promise<User[]> {
    return await this.model.find().exec();
  }

  async getUser(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  }

  async getUserByUsername(username: string) {
    return await this.model.findOne({ username });
  }

  async addUser(dto: UserDto): Promise<User> {
    const newUser = new this.model(dto);

    newUser.setPassword(dto.password);

    return await newUser.save();
  }

  async updateUser(id: string, dto: UserDto): Promise<User> {
    return await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
