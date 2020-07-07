import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

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

    async registerUser(createUserDto: CreateUserDto):Promise<any>{
        const userEmail = await this.userService.findOneEmail(createUserDto.email)

        if (userEmail) {
            return new Error('User with this email has been create')
        }

        const userName = await this.userService.findOneName(createUserDto.username)
        
        if (userName){
            return new Error('User with this username has been create')
        }

        await this.userService.createUser(createUserDto.email, createUserDto.username, createUserDto.password, createUserDto.isCompany)
    
    }
}
