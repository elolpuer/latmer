import {
    Entity,
    Column,
    PrimaryGeneratedColumn,  
} from 'typeorm';

@Entity('users')
export class User{

    @PrimaryGeneratedColumn({type: 'integer'})
    id: string;

    @Column()
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    IsCompany: boolean;

}   