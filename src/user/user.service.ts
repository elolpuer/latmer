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
        return await this.userRepository.findOne(email)
    }

    async findOneName(username: string): Promise<User> {
        return await this.userRepository.findOne(username)
    }

    async createUser(email: string, username: string, password: string, IsCompany: boolean ):Promise<any>{
        const hash = await bcrypt.hash(password, 13)

        await this.userRepository.create({
            username,
            email,
            password: hash,
            IsCompany
        })
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id)
    }
}
