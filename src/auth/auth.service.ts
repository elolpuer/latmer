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
        try { 
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
}
