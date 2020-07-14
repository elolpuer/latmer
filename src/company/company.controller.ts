import { Controller, Get, Render, Req, Post, Res } from '@nestjs/common';
import { CompanyService } from './company.service'
import { Request, Response } from 'express'

import { RenderPageDto } from 'src/dto/render.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService){}

    @Get('all')
    @Render('companies')
    async all(@Req() req: Request): Promise<RenderPageDto> {
        const companies = await this.companyService.findAll()

        console.log(companies)

        return { 
            title: 'Companies', 
            user: req.session.user, 
            allCompanies: companies 
        }
    }

    @Get('profile')
    @Render('user')
    getProfile(@Req() req: Request): RenderPageDto {
        return {
            title: req.session.user.username,
            user: req.session.user
        }
    }

    @Post('profile/logout')
    logout(@Req() req: Request, @Res() res: Response): void {
        if (req.session.user) {
            delete req.session.user
            res.redirect('/')
        }
    }
}
