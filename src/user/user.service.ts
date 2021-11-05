import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}

  async findAll() {
      return await this.userRepository.find({ relations: ['address', 'contact'] });
  }

  async findOne(id: number) {
      return await this.userRepository.findOne(id, { relations: ['address', 'contact'] });
  }

  async create(data: User): Promise<User> {
      let user = this.userRepository.create(data);
      return await this.userRepository.save(user)
    }
    
    async update(id : number, data : any) {
      let user = await this.userRepository.findOne(id, { relations: ['address', 'contact'] });
      if(user) {
          if (id && Number(id)) {
              await this.userRepository.save({id, ...user, ...data });
              return await this.userRepository.findOne(id, { relations: ['address', 'contact'] });
          }
      }
  }

  async delete(id : number) {
      return await this.userRepository.delete(id);
  }
}
