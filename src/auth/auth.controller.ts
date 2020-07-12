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
    outputRegister(): RenderPageDto {
        return { title: 'Sign Up'}
    }

    @Post('company')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any>{
        try { 
            this.authService.registerUser(createUserDto,res)
                .then(()=>{res.redirect('/auth/sign_in')})

        } catch (error) {
            console.error(error)
        } 
    }

    @Get('consumer')
    @Render('sign_up_consumer')
    outputLogin(): RenderPageDto {
        return { title: 'Sign In' }
    }

    @Post('consumer')
    async login(@Body() authUserDto: AuthUserDto, @Res() res: Response): Promise<any>{
        try {
            await this.authService.loginUser(authUserDto, res)
                .then(()=>{ res.redirect('/') })
        } catch (error) {
            console.error(error)
        }
        
        
    }
}
