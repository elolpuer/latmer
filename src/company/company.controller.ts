import { Controller, Get, Render, Req, Post, Res, Param, Body, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service'
import { Request, Response } from 'express'

import { RenderPageDto } from 'src/dto/render.dto';
import { MerchDto } from 'src/dto/merch.dto';
import { AuthGuard } from 'src/guards/auth.guard';

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

    @UseGuards(AuthGuard)
    @Get('profile')
    @Render('user')
    getProfile(@Req() req: Request): RenderPageDto {
        return {
            title: req.session.user.username,
            user: req.session.user
        }
    }

    @UseGuards(AuthGuard)
    @Post('profile/logout')
    logout(@Req() req: Request, @Res() res: Response): void {
        if (req.session.user) {
            delete req.session.user
            res.redirect('/')
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile/products')
    @Render('merch')
    async getProducts(@Req() req: Request): Promise<RenderPageDto> {
        const products = await this.companyService.findAllProducts(req.session.user.id)

        return { title: 'Products', user: req.session.user, isProducts: true ,merch_Title: 'Product' , merch_Array: products }
    } 

    @UseGuards(AuthGuard)
    @Post('profile/products')
    async addProduct(@Body() merchDto: MerchDto, @Req() req: Request, @Res() res: Response): Promise<any>{
        await this.companyService.addProduct(merchDto, req.session.user.id)
                .then(()=>{ return res.redirect('/company/profile/products') })
    }

    @UseGuards(AuthGuard)
    @Post('profile/products/product:id')
    async deleteProduct(@Param('id') id: string, @Res() res: Response): Promise<any>{
        await this.companyService.deleteProduct(id)
                .then(()=>{ return res.redirect('/company/profile/products') })
    }

    @UseGuards(AuthGuard)
    @Get('profile/services')
    @Render('merch')
    async getServices(@Req() req: Request): Promise<RenderPageDto> {
        const services = await this.companyService.findAllServices(req.session.user.id)

        return { title: 'Products', user: req.session.user, isProducts: false ,merch_Title: 'Service' , merch_Array: services }
    }

    @UseGuards(AuthGuard)
    @Post('profile/services')
    async addService(@Body() merchDto: MerchDto, @Req() req: Request, @Res() res: Response): Promise<any>{
        await this.companyService.addService(merchDto, req.session.user.id)
                .then(()=>{ return res.redirect('/company/profile/services') })
    }

    @UseGuards(AuthGuard)
    @Post('/profile/services/service:id')
    async deleteService(@Param('id') id: string, @Res() res: Response): Promise<any> {
        await this.companyService.deleteService(id)
                .then(()=>{ return res.redirect('/company/profile/services') })
    }
}
