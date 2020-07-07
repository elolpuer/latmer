import {
    Entity,
    Column,
    PrimaryGeneratedColumn  
} from 'typeorm'
import { IsEmail } from 'class-validator'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsEmail()
    email: string

    @Column({unique: true})
    username: string;

    @Column()
    password: string

    @Column()
    IsCompany: boolean
}