import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { DBConnectionService } from './db-connection.service'
import { AppController } from './app.controller';
import { CompanyModule } from './company/company.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DBConnectionService,
    }),
    AuthModule,
    CompanyModule,
    ConsumerModule
  ],
  controllers: [AppController]
})
export class AppModule {}
