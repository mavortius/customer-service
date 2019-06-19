import { Document } from 'mongoose';

export enum Role {
  READER = 'READER',
  OPERATOR = 'OPERATOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly fullName: string;
  readonly roles: Role[];
  readonly hash: string;
  readonly salt: string;

  setPassword(password: string): void;

  validPassword(password: string): boolean;
}
