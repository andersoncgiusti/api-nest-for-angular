import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    contacts: string

    @ManyToOne(() => User, user => user.contact, {cascade: true})
    user: User
}
