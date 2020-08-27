import {
    Entity,
    Column,
    PrimaryGeneratedColumn,  
} from 'typeorm';

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn({type: 'integer'})
    id: string

    @Column({type: 'integer'})
    company_id: string

    @Column()
    name: string

    @Column({type: 'text'})
    description?: string

    @Column()
    price: string

    @Column()
    img?: string

}