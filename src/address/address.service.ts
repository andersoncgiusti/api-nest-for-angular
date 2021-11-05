import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor (
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ){}

  async findAll() {
    return await this.addressRepository.find({ select: ['id', 'street', 'city', 'state', 'zipcode'], relations: ['user'] });
  }

  async findOne(id : number) {
    return await this.addressRepository.findOne(id, { relations: ['user'] });
  }

  // async create(data : any) {
  //   let address : any = await this.addressRepository.create(data);
  //   await this.addressRepository.save(address)
  //   return await this.addressRepository.findOne(address.id, { relations: ['user'] });
  // }

  async create(data: Address): Promise<Address> {
    let address = this.addressRepository.create(data);
    return await this.addressRepository.save(address)
  }

  async update(id : number, data : any) {
    let address = await this.addressRepository.findOne(id, {relations: ['user'] });
    if(address) {
        if (id && Number(id)) {
            await this.addressRepository.save({id, ...address, ...data });
            return await this.addressRepository.findOne(id, { relations: ['user'] });
        }
    }
  }

  async delete(id : number) {
      return await this.addressRepository.delete(id);
  } 
}
