import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "sectring", signOptions: {
        expiresIn: "7d",
      },
    }),
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
    AuthModule,
  ],  
})
export class AppModule {}
