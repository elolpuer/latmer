import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { RenderPageDto } from '../dto/render.dto'
import { AuthUserDto } from 'src/dto/auth-user.dto';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('company')
    @Render('sign_up_company')
    outputRegisterCompany(): RenderPageDto {
        return { title: 'Sign Up'}
    }

    @Post('company')
    async registerCompany(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any>{
        try { 
            this.authService.registerCompany(createUserDto,res)
                .then(()=>{res.redirect('/auth/login')})

        } catch (error) {
            console.error(error)
        } 
    }

    @Get('consumer')
    @Render('sign_up_consumer')
    outputRegisterConsumer(): RenderPageDto {
        return { title: 'Sign In' }
    }

    @Post('consumer')
    async registerConsumer(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any>{
        try { 
            this.authService.registerConsumer(createUserDto,res)
                .then(()=>{res.redirect('/auth/login')})

        } catch (error) {
            console.error(error)
        } 
    }


    @Get('login')
    @Render('sign_in')
    outputLogin(): RenderPageDto {
        return { title: 'Sign In' }
    }

    @Post('login')
    async login(@Body() authUserDto: AuthUserDto, @Res() res: Response): Promise<any>{
        return this.authService.login(authUserDto)
            .then((token)=>{console.log(token)})
            .then(()=>{res.redirect('/')})

    }
}
