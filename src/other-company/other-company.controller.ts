import { Controller, Get, Render, Param, Req } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Request } from 'express'
import { RenderPageDto } from '../dto/render.dto'

@Controller(':username')
export class OtherCompanyController {
    constructor(private companyService: CompanyService){}
    @Get()
    @Render('other_company')
    async other_company(@Req() req: Request, @Param('username') username: string): Promise<RenderPageDto> {
        try {
            const otherCompany = await this.companyService.findOneName(username)
            const company = {
                id: otherCompany.id,
                username: otherCompany.username,
                email: otherCompany.email
            } 
            return { title: `${username}`, user: req.session.user, company }
        } catch (error) {
            console.error(error)
        }
        
    }

    @Get('products-:id')
    @Render('other_company_merch')
    async other_company_products(@Req() req: Request, @Param('id') id: string): Promise<RenderPageDto> {
        const other_company_products = await this.companyService.findAllProducts(id)

        return { title: `Products`, user: req.session.user, merch_Array: other_company_products}
    }

    @Get('services-:id')
    @Render('other_company_merch')
    async other_company_services(@Req() req: Request, @Param('id') id: string): Promise<RenderPageDto> {
        const other_company_services = await this.companyService.findAllServices(id)

        return { title: `Services`, user: req.session.user, merch_Array: other_company_services}
    }
}
