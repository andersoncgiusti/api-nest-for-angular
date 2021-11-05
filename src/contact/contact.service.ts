import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor (
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ){}

  async findAll() {
    return await this.contactRepository.find({ select: ['id', 'type', 'contacts'], relations: ['user'] });
  }

  async findOne(id : number) {
    return await this.contactRepository.findOne(id, { relations: ['user'] });
  }

  // async create(data : any) {
  //   let contact : any = await this.contactRepository.create(data);
  //   await this.contactRepository.save(contact)
  //   return await this.contactRepository.findOne(contact.id, { relations: ['user'] });
  // }

  async create(data: Contact): Promise<Contact> {
    let contact = this.contactRepository.create(data);
    return await this.contactRepository.save(contact)
  }

  async update(id : number, data : any) {
    let contact = await this.contactRepository.findOne(id, {relations: ['user'] });
    if(contact) {
        if (id && Number(id)) {
            await this.contactRepository.save({id, ...contact, ...data });
            return await this.contactRepository.findOne(id, { relations: ['user'] });
        }
    }
  }

  async delete(id : number) {
    return await this.contactRepository.delete(id);
  }
}
