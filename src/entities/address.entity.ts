import {
    Entity,
    Column,
    PrimaryColumn,  
} from 'typeorm';

@Entity('companies_addresses')
export class Address{
    
    @PrimaryColumn({type: 'integer'})
    company_id: string

    @Column()
    state: string

    @Column()
    city: string

    @Column()
    district: string

    @Column()
    street: string

    @Column()
    house: string

}