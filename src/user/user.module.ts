import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/address/entities/address.entity';
import { Contact } from 'src/contact/entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Contact])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
