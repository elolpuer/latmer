import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { AllCompaniesDto } from 'src/dto/all.companies.dto';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { MerchDto } from 'src/dto/merch.dto';
// import { Request } from 'express'

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
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

    async findAllProducts(company_id: string): Promise<Product[]> {     
        return await this.productRepository.find({company_id})
    }

    async findAllServices(company_id: string): Promise<Product[]> {     
        return await this.serviceRepository.find({company_id})
    }

    async addProduct(merchDto: MerchDto, id: string): Promise<void> {
        if (!merchDto.img) {
            merchDto.img = ''
        }
        const product = new Product
                product.name = merchDto.name;
                product.company_id = id;
                product.description = merchDto.description;
                product.expir_date_from = merchDto.expir_date_from;
                product.expir_date_to = merchDto.expir_date_to;
                product.img = merchDto.img;

        await this.productRepository.save(product)        
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.delete({id})
    }

    async addService(merchDto: MerchDto, id: string): Promise<void> {
        if (!merchDto.img) {
            merchDto.img = ''
        }
        const service = new Service
            service.name = merchDto.name;
            service.company_id = id,
            service.description = merchDto.description
            service.img = merchDto.img

        await this.serviceRepository.save(service)
    }

    async deleteService(id: string): Promise<void> {
        await this.serviceRepository.delete({id})
    }
}
