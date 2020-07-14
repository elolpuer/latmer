import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { CompanyService } from './company.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService){}

    @UseGuards(JwtAuthGuard)
    @Get('user')
    getProfile(@Request() req) {
        return req.user
    }
}
