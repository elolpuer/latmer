import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CompanyService } from '../company//company.service';
import { ConsumerService } from '../consumer/consumer.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport'
import { Company } from 'src/entities/company.entity';
import { Consumer } from '../entities/consumers.entity';
import { Product } from 'src/entities/product.entity';
import { Service } from 'src/entities/service.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Consumer, Product, Service]),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, CompanyService, ConsumerService]
})
export class AuthModule {}
