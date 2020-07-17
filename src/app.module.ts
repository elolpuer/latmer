import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DBConnectionService } from './db-connection.service'
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { ConsumerModule } from './consumer/consumer.module';
import { CompanyService } from './company/company.service';
import { Company } from './entities/company.entity';
import { Address } from './entities/address.entity';
import { Product } from './entities/product.entity';
import { Service } from './entities/service.entity';
import { OtherCompanyModule } from './other-company/other-company.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBConnectionService,
    }),
    TypeOrmModule.forFeature([Company, Address, Product, Service]),
    AuthModule,
    CompanyModule,
    ConsumerModule,
    OtherCompanyModule
  ],
  controllers: [AppController],
  providers: [CompanyService]
})
export class AppModule {}
