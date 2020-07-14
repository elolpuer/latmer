import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CompanyService } from '../company//company.service';
import { ConsumerService } from '../consumer/consumer.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Company } from 'src/entities/company.entity';
import { Consumer } from '../entities/consumers.entity';
import { JwtStrategy } from './jwt-strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Consumer]),
    PassportModule,
    JwtModule.register({
      secret: String(process.env.SECRET),
      signOptions: { expiresIn: '72h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, CompanyService, ConsumerService, JwtStrategy]
})
export class AuthModule {}
