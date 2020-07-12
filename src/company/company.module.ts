import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from '../entities/company.entity'
import { Address } from 'src/entities/address.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Company, Address])],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}
