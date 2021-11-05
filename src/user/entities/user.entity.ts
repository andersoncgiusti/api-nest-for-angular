import { Address } from "src/address/entities/address.entity";
import { Contact } from "src/contact/entities/contact.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({ select: false })
    password: string

    @OneToMany(() => Address, address => address.user, {cascade: ['insert', 'update']})
    address: Address[]

    @OneToMany(() => Contact, contact => contact.user, {cascade: ['insert', 'update']})
    contact: Contact[]

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password, 12)
    }
}
