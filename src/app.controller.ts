import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request } from 'express'
import { RenderPageDto } from './dto/render.dto';

@Controller()
export class AppController{
    @Get()
    @Render('index')
    main(@Req() req: Request): RenderPageDto{
        return { title: 'Index', user: req.session.user}
    }
}