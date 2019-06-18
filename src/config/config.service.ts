import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  JWT_SECRET: string;
  MONGODB_URI: string;
  private readonly envConfig: { [key: string]: string };

  constructor() {
    if (process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'staging') {
      this.envConfig = {
        JWT_SECRET: process.env.JWT_SECRET,
        MONGODB_URI: process.env.MONGODB_URI,
      };
    } else {
      this.envConfig = dotenv.parse(fs.readFileSync('.env'));
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
