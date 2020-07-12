import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>
    ){}
    
    async findOneEmail(email: string): Promise<Company>{
        return await this.companyRepository.findOne({email})
    }

    async findOneName(username: string): Promise<Company>{
        return await this.companyRepository.findOne({username})
    }

    async createCompany(email: string, username: string, password: string ): Promise<void> {
        const hash = await bcrypt.hash(password, 13)

        const company = new Company
            company.email = email;
            company.username = username;
            company.password = hash
            
        await this.companyRepository.save(company)
    }
}
