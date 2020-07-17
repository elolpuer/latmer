import { Module } from '@nestjs/common';
import { OtherCompanyService } from './other-company.service';
import { OtherCompanyController } from './other-company.controller';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/entities/company.entity';
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';


@Module({
  imports:[TypeOrmModule.forFeature([Company, Address, Product, Service]), CompanyModule],
  providers: [OtherCompanyService, CompanyService],
  controllers: [OtherCompanyController]
})
export class OtherCompanyModule {}
