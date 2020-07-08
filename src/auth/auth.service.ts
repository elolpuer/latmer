import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneEmail(email)

        if (user && user.password === password){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async registerUser(createUserDto: CreateUserDto, res):Promise<any>{
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
            await this.userService.createUser(
                createUserDto.email,
                createUserDto.username,
                createUserDto.password,
                createUserDto.isCompany
                )    
        } catch (error) {
            console.error(error)
        }
    }

    async loginUser(authUserDto: AuthUserDto, res): Promise<any>{
        try {
            const user = await this.userService.findOneEmail(authUserDto.email)

            if (!user) {
                return res.status(400).json({message:'User with this email don`t created'})
            }
            
            const isMatch = await bcrypt.compare(authUserDto.password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Incorrect data'})
            }
        } catch (error) {
            console.error(error)
        }
    }
}
