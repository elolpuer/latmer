import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CompanyService } from '../company/company.service';
import { ConsumerService } from '../consumer/consumer.service';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly companyService: CompanyService,
        private readonly consumerService: ConsumerService
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.companyService.findOneEmail(email)

        if (user && user.password === password){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async registerCompany(createUserDto: CreateUserDto, res: Response):Promise<any>{
        try {
            const userEmail = await this.companyService.findOneEmail(createUserDto.email)
            const userName = await this.companyService.findOneName(createUserDto.username)

            if (userEmail) {
                return res.status(400).json({message:'User with this email has been create'})
            }      
            if (userName){
                return res.status(400).json({message:'User with this username has been create'})
            }

            await this.companyService.createCompany(
                createUserDto.email,
                createUserDto.username,
                createUserDto.password,
                )    
        } catch (error) {
            console.error(error)
        }
    }

    async registerConsumer(createUserDto: CreateUserDto, res: Response):Promise<any>{
        try {
            const userEmail = await this.consumerService.findOneEmail(createUserDto.email)
            const userName = await this.consumerService.findOneName(createUserDto.username)

            if (userEmail) {
                return res.status(400).json({message:'User with this email has been create'})
            }      
            if (userName){
                return res.status(400).json({message:'User with this username has been create'})
            }

            await this.consumerService.createConsumer(
                createUserDto.email,
                createUserDto.username,
                createUserDto.password,
                )    
        } catch (error) {
            console.error(error)
        }
    }

    async loginUser(authUserDto: AuthUserDto, res: Response): Promise<any>{
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
