import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { AllCompaniesDto } from 'src/dto/all.companies.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>
    ){}
    
    async findAll(): Promise<AllCompaniesDto[]>{
        return await this.companyRepository.find()
    }

    async findOneEmail(email: string): Promise<Company>{
        return await this.companyRepository.findOne({email})
    }

    async findOneName(username: string): Promise<Company>{
        return await this.companyRepository.findOne({username})
    }

    async createCompany(email: string, username: string, password: string ): Promise<Company> {
        const hash = await bcrypt.hash(password, 13)

        const company = new Company
            company.email = email;
            company.username = username;
            company.password = hash;
            company.IsCompany = true;
            
        return await this.companyRepository.save(company)
    }

    
}
