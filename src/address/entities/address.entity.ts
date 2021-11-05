import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Address {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string
    
    @Column()
    zipcode: string

    @ManyToOne(() => User, user => user.address, {cascade: true})
    user: User
}
    
