import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() body: Address) {
    return this.addressService.create(body);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.delete(+id);
  }
}
