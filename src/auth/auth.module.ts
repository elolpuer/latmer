import { Module } from '@nestjs/common';
import { ServiceController } from './service/service.controller';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [ServiceController, AuthController],
  providers: [AuthService]
})
export class AuthModule {}
