import { 
    Entity,
    Column,
    PrimaryGeneratedColumn, 
} from 'typeorm';

@Entity('favorites_companies')
export class FavoritesEntity {
    @PrimaryGeneratedColumn({type: 'integer'})
    id: string

    @Column({type: 'integer'})
    user_id: string

    @Column({type: 'integer'})
    company_id: string

}