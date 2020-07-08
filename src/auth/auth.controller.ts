import { Controller, Get, Render, Post, Body, Response, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private userService: UserService){}

    @Get('sign_up')
    @Render('sign_up')
    outputRegister(){
        return { title: 'Sign Up'}
    }

    @Post('sign_up')
    async register(@Body() createUserDto: CreateUserDto, @Response() res): Promise<any>{
        try {
            const userEmail = await this.userService.findOneEmail(createUserDto.email)
            const userName = await this.userService.findOneName(createUserDto.username)

            if (userEmail) {
                return res.status(400).json({message:'User with this email has been create'})
            }      
            if (userName){
                return res.status(400).json({message:'User with this username has been create'})
            }
            
            createUserDto.isCompany = Boolean(createUserDto.isCompany)
            this.authService.registerUser(createUserDto)
                .then(()=>{res.redirect('/auth/sign_in')})

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
