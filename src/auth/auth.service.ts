import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CompanyService } from '../company/company.service';
import { ConsumerService } from '../consumer/consumer.service';
import { JwtService } from '@nestjs/jwt'

import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { UserRO, UserData } from '../dto/user.interface'
import { Company } from '../entities/company.entity'

import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
    constructor(
        private readonly companyService: CompanyService,
        private readonly consumerService: ConsumerService,
        private readonly jwtService: JwtService
    ){}

    async validateCompany(email: string, password: string): Promise<any> {
        const user = await this.companyService.findOneEmail(email)

        if (user && bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateConsumer(email: string, password: string): Promise<any> {
        const user = await this.consumerService.findOneEmail(email)

        if (user && bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async registerCompany(createUserDto: CreateUserDto, res: Response):Promise<any>{
        try {
            const userEmail = await this.companyService.findOneEmail(createUserDto.email)
            const userNameComp = await this.companyService.findOneName(createUserDto.username)
            const userNameCons = await this.consumerService.findOneName(createUserDto.username)

            if (userEmail) {
                return res.status(400).json({message:'User with this email has been create'})
            }      
            if (userNameComp){
                return res.status(400).json({message:'User with this username has been create'})
            }
            if (userNameCons){
                return res.status(400).json({message:'User with this username has been create'})
            }

            const createdCompany = await this.companyService.createCompany(
                createUserDto.email,
                createUserDto.username,
                createUserDto.password,
                )
            // return this.buildUserRO(createdCompany)
        } catch (error) {
            console.error(error)
        }
    }

    async registerConsumer(createUserDto: CreateUserDto, res: Response):Promise<any>{
        try {
            const userEmail = await this.consumerService.findOneEmail(createUserDto.email)
            const userNameComp = await this.companyService.findOneName(createUserDto.username)
            const userNameCons = await this.consumerService.findOneName(createUserDto.username)

            if (userEmail) {
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

    async login(user: any) {
        const payload = {username: user.username, id: user.id, isCompany: user.isCompany}
        console.log(`payload: ${payload}`)
        return {
            access_token: this.jwtService.sign(payload),
        }

    }

    // public generateJWT(user): Promise<any>{
    //     const today = new Date()
    //     const exp = new Date(today)
    //     exp.setDate(today.getDate()+60)

    //     return jwt.sign({
    //         id: user.id,
    //         username: user.username,
    //         email: user.email,
    //         exp: exp.getTime() / 1000,
    //     }, process.env.SECRET)

    // }

    // private buildUserRO(user: Company){
    //     const userRO = {
    //         id: user.id,
    //         username: user.username,
    //         email: user.email,
    //         token: this.generateJWT(user)
    //     }

    //     return {user: userRO}
    // }
}
