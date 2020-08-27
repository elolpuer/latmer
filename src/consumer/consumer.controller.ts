import { Controller, Get, Req, Render, Post, Res } from '@nestjs/common';
import { ConsumerService } from './consumer.service'
import { Request, Response } from 'express'
import { RenderPageDto } from '../dto/render.dto'

@Controller('consumer')
export class ConsumerController {
    constructor(private consumerService: ConsumerService){}

    @Get('profile')
    @Render('user_consumer')
    getProfile(@Req() req: Request): RenderPageDto {
        return { title: `${req.session.user.username}`, user: req.session.user }
    }

    @Post('profile/logout')
    logout(@Req() req: Request, @Res() res: Response): void {
        if (req.session.user) {
            delete req.session.user
            res.redirect('/')
        }
    }

    @Post('add-favorites')
    add(@Req() req: Request): void {
        console.log(req)
    }
}
