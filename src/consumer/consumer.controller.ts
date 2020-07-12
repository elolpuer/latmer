import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service'

@Controller('consumer')
export class ConsumerController {
    constructor(private consumerService: ConsumerService){}
}
