import { Controller, Get, Render, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/dto/create-user.dto';
import { Response } from 'express';
import { RenderPage } from '../dto/render.dto'
import { AuthUserDto } from 'src/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Get('sign_up')
    @Render('sign_up')
    outputRegister(): RenderPage{
        return { title: 'Sign Up'}
    }

    @Post('sign_up')
    async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<any>{
        try { 
            this.authService.registerUser(createUserDto,res)
                .then(()=>{res.redirect('/auth/sign_in')})

        } catch (error) {
            console.error(error)
        } 
    }

    @Get('sign_in')
    @Render('sign_in')
    outputLogin(): RenderPage {
        return { title: 'Sign In' }
    }

    @Post('sign_in')
    async login(@Body() authUserDto: AuthUserDto, @Res() res: Response): Promise<any>{
        try {
            await this.authService.loginUser(authUserDto, res)
                .then(()=>{ res.redirect('/') })
        } catch (error) {
            console.error(error)
        }
        
        
    }
}
