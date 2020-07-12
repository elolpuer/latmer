import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { TypeOrmModule } from '@nestjs/typeorm'

import { Consumer } from 'src/entities/consumers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Consumer])],
  providers: [ConsumerService],
  controllers: [ConsumerController]
})
export class ConsumerModule {}
