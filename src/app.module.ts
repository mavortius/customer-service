import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/customers', { useNewUrlParser: true }),
    CustomersModule,
    AuthModule,
  ],
})
export class AppModule {
}
