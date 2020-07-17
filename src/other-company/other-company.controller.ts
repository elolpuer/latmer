import { Controller, Get, Render, Req, Param } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { Request } from 'express'
import { RenderPageDto } from '../dto/render.dto'

@Controller(':username')
export class OtherCompanyController {
    constructor(private companyService: CompanyService){}
    @Get()
    @Render('other_company')
    async other_company(@Req() req: Request, @Param() params): Promise<RenderPageDto> {
        try {
            const otherCompany = await this.companyService.findOneName(params.username)
            const company = {
                id: otherCompany.id,
                username: otherCompany.username,
                email: otherCompany.email
            } 
            return { title: `${params.username}`, company }
        } catch (error) {
            console.error(error)
        }
        
    }

    @Get('products-:id')
    @Render('other_company_merch')
    async other_company_products(@Param() params): Promise<RenderPageDto> {
        const other_company_products = await this.companyService.findAllProducts(params.id)

        return { title: `Products`, merch_Array: other_company_products}
    }

    @Get('services-:id')
    @Render('other_company_merch')
    async other_company_services(@Param() params): Promise<RenderPageDto> {
        const other_company_services = await this.companyService.findAllServices(params.id)

        return { title: `Services`, merch_Array: other_company_services}
    }
}
