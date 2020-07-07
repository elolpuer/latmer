import { Controller, Get, Render, Post, Body, Redirect } from '@nestjs/common';
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
    async register(@Body() createUserDto: CreateUserDto): Promise<any>{
        try {
            this.authService.registerUser(createUserDto)
                .then(()=>{
                    @Redirect('/', 200)
                })
        } catch (error) {
            console.error(error)
        } 
    }

    @Get('sign_in')
    @Render('sign_in')
    outputLogin(){
        return { title: 'Sign In' }
    }
}
