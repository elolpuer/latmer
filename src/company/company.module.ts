import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from 'src/entities/company.entity'
import { Address } from 'src/entities/address.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity'
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[TypeOrmModule.forFeature([Company, Product, Service]), AuthModule],
  providers: [CompanyService],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
