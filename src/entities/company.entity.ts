import {
    Entity,
    Column,
    PrimaryGeneratedColumn,  
} from 'typeorm';

@Entity('companies')
export class Company{

    @PrimaryGeneratedColumn({type: 'integer'})
    id: string;

    @Column()
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    IsCompany: boolean

}
