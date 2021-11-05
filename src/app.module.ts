import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'finger',
      database: 'api-nest-for-angular',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    AddressModule,
    ContactModule,
  ],  
})
export class AppModule {}
