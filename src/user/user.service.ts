import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findOneEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({email})
    }

    async findOneName(username: string): Promise<User> {
        return await this.userRepository.findOne({username})
    }

    async createUser(email: string, username: string, password: string, IsCompany: boolean ):Promise<void>{
        const hash = await bcrypt.hash(password, 13);

        const user = new User;
            user.email = email;
            user.username = username;
            user.password = hash;
            user.IsCompany = IsCompany;

        await this.userRepository.save(user);
            
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }
}
