import { Document } from 'mongoose';

export enum Genre {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Customer extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly genre: Genre;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly createdAt: Date;
}
