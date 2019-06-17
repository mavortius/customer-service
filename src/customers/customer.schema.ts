import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  fistName: String,
  lastName: String,
  email: String,
  phone: String,
  address: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
