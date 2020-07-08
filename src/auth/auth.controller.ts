import { Controller, Get, Render, Post, Body, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Get('sign_up')
    @Render('sign_up')
    outputRegister(){
        return { title: 'Sign Up'}
    }

    @Post('sign_up')
    async register(@Body() createUserDto: CreateUserDto, @Response() res): Promise<any>{
        try {
            if(typeof(this.authService.registerUser(createUserDto)) === typeof('H')) {
                res.status(400)
            }

        } catch (error) {
            console.error(error)
        } 
    }

    @Get('sign_in')
    @Render('sign_in')
    outputLogin(){
        return { title: 'Sign In' }
    }

    @Post('sign_in')
    login(@Response() res){
        res.redirect('/')
    }
}
