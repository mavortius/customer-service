import * as mongoose from 'mongoose';
import { Genre } from './customer.interface';

export const CustomerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  genre: { type: String, enum: Object.keys(Genre) },
  email: String,
  phone: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
