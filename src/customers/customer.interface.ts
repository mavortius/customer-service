import { Document } from 'mongoose';

export interface Customer extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly createdAt: Date;
}
