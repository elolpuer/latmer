import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Consumer } from 'src/entities/consumers.entity';
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'


@Injectable()
export class ConsumerService {
    constructor(
        @InjectRepository(Consumer)
        private companyRepository: Repository<Consumer>
    ){}
    
    async findOneEmail(email: string): Promise<Consumer>{
        return await this.companyRepository.findOne({email})
    }

    async findOneName(username: string): Promise<Consumer>{
        return await this.companyRepository.findOne({username})
    }

    async createConsumer(email: string, username: string, password: string ): Promise<void> {
        const hash = await bcrypt.hash(password, 13)

        const consumer = new Consumer
            consumer.email = email;
            consumer.username = username;
            consumer.password = hash
            consumer.IsCompany = false
            
        await this.companyRepository.save(consumer)
    }
}
