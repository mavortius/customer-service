import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import { Role } from './user.interface';

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  roles: { type: [String], enum: Object.keys(Role) },
  hash: String,
  salt: String,
});

UserSchema.methods.setPassword = function(password): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function(password): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};
