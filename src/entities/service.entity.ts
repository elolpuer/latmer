import {
    Entity,
    Column,
    PrimaryGeneratedColumn,  
} from 'typeorm';

@Entity('services')
export class Service{
    @PrimaryGeneratedColumn({type: 'integer'})
    id: string

    @Column({type: 'integer'})
    company_id: string

    @Column()
    name: string

    @Column({type: 'text'})
    description?: string

    @Column()
    img?: string

}