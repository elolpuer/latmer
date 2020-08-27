import { Controller, Get, Render, Req, Post, Res, Param, Body, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service'
import { Request, Response } from 'express'

import { RenderPageDto } from 'src/dto/render.dto';
import { MerchDto } from 'src/dto/merch.dto';
import { CompanyAuthGuard } from 'src/guards/company.auth.guard';

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

    @UseGuards(CompanyAuthGuard)
    @Get('delete/:id')
    @Render('delete_user')
    getDeleteUser(@Req() req: Request, @Param('id') id: string): RenderPageDto {
        return { title: 'Delete Company', id, user: req.session.user }
    }

    @UseGuards(CompanyAuthGuard)
    @Post('delete/:id')
    async deleteUser(@Req() req: Request, @Res() res: Response, @Param('id') id: string): Promise<any> {
        await this.companyService.deleteCompany(id)
            .then(()=>{ delete req.session.user  })
            .then(()=>{ return res.redirect('/') })
    }

    @UseGuards(CompanyAuthGuard)
    @Get('profile')
    @Render('user_company')
    getProfile(@Req() req: Request): RenderPageDto {
        return {
            title: req.session.user.username,
            user: req.session.user
        }
    }

    @UseGuards(CompanyAuthGuard)
    @Post('profile/logout')
    logout(@Req() req: Request, @Res() res: Response): void {
        if (req.session.user) {
            delete req.session.user
            res.redirect('/')
        }
    }

    @UseGuards(CompanyAuthGuard)
    @Get('profile/products')
    @Render('merch')
    async getProducts(@Req() req: Request): Promise<RenderPageDto> {
        const products = await this.companyService.findAllProducts(req.session.user.id)

        return { title: 'Products', user: req.session.user, isProducts: true ,merch_Title: 'Product' , merch_Array: products }
    } 

    @UseGuards(CompanyAuthGuard)
    @Post('profile/products')
    async addProduct(@Body() merchDto: MerchDto, @Req() req: Request, @Res() res: Response): Promise<any>{
        await this.companyService.addProduct(merchDto, req.session.user.id)
                .then(()=>{ return res.redirect('/company/profile/products') })
    }

    @UseGuards(CompanyAuthGuard)
    @Post('profile/products/product:id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response): Promise<any>{
        await this.companyService.deleteProduct(id)
                .then(()=>{ return res.redirect('/company/profile/products') })
    }

    @UseGuards(CompanyAuthGuard)
    @Get('profile/services')
    @Render('merch')
    async getServices(@Req() req: Request): Promise<RenderPageDto> {
        const services = await this.companyService.findAllServices(req.session.user.id)

        return { title: 'Products', user: req.session.user, isProducts: false ,merch_Title: 'Service' , merch_Array: services }
    }

    @UseGuards(CompanyAuthGuard)
    @Post('profile/services')
    async addService(@Body() merchDto: MerchDto, @Req() req: Request, @Res() res: Response): Promise<any>{
        await this.companyService.addService(merchDto, req.session.user.id)
                .then(()=>{ return res.redirect('/company/profile/services') })
    }

    @UseGuards(CompanyAuthGuard)
    @Post('/profile/services/service:id')
    async deleteService(@Param('id') id: string, @Res() res: Response): Promise<any> {
        await this.companyService.deleteService(id)
                .then(()=>{ return res.redirect('/company/profile/services') })
    }
}
