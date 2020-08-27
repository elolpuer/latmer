import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CompanyService } from '../company/company.service';
import { ConsumerService } from '../consumer/consumer.service';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
// import { Company } from '../entities/company.entity'
import { SessionUserDto } from '../dto/session-user.dto'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private readonly companyService: CompanyService,
        private readonly consumerService: ConsumerService,
    ){}

    async registerCompany(createUserDto: CreateUserDto, res: Response):Promise<any>{
        try {
            const userEmailComp = await this.companyService.findOneEmail(createUserDto.email)
            const userEmailCons = await this.consumerService.findOneEmail(createUserDto.email)
            const userNameComp = await this.companyService.findOneName(createUserDto.username)
            const userNameCons = await this.consumerService.findOneName(createUserDto.username)

            if (userEmailComp) {
                return res.status(400).json({message:'User with this email has been create'})
            }  
            if (userEmailCons) {
                return res.status(400).json({message:'User with this email has been create'})
            }  
            if (userNameComp){
                return res.status(400).json({message:'User with this username has been create'})
            }
            if (userNameCons){
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
            const userEmailComp = await this.companyService.findOneEmail(createUserDto.email)
            const userEmailCons = await this.consumerService.findOneEmail(createUserDto.email)
            const userNameComp = await this.companyService.findOneName(createUserDto.username)
            const userNameCons = await this.consumerService.findOneName(createUserDto.username)

            if (userEmailComp) {
                return res.status(400).json({message:'User with this email has been create'})
            }     
            if (userEmailCons) {
                return res.status(400).json({message:'User with this email has been create'})
            }   
            if (userNameComp){
                return res.status(400).json({message:'User with this username has been create'})
            }
            if (userNameCons){
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

    async login(authUserDto: AuthUserDto, res: Response): Promise<any>{
        const userComp = await this.companyService.findOneEmail(authUserDto.email)
        const userCons = await this.consumerService.findOneEmail(authUserDto.email)

        if (userComp) {
            const isMatch = await bcrypt.compare(authUserDto.password, userComp.password)

            if (!isMatch) {
                return res.status(400).json({message:'Wrong params'})
            }

            return await this.createSessionUser(userComp.id, userComp.username, userComp.email, userComp.IsCompany)
            
            
        } else if (userCons){
            const isMatch = await bcrypt.compare(authUserDto.password, userCons.password)
            
            if (!isMatch) {
                return res.status(400).json({message:'Wrong params'})
            }

            return await this.createSessionUser(userCons.id, userCons.username, userCons.email, userCons.IsCompany)

        }
        else {
            return res.status(404).json({message:'User with this params don`t exist'})
        }
        
    }

    async createSessionUser(id: string, username: string, email: string, isCompany: boolean): Promise<SessionUserDto> {
        return {
            id,
            username,
            email,
            isCompany
        }
    }
}
