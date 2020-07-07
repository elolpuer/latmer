import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';

import * as session from 'express-session';
import * as passport from 'passport'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('view options', { layout: '/layouts/main' });
  hbs.registerPartials(join(__dirname, "../", "/views/partials"));

  app.use(
    session({
    saveUninitialized:false,
    resave: false,
    secret: 'tss...it is a secret',
    cookie:{
        sameSite: true,
        secure: false
        }
      }
    )
  )

  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(5000);


}
bootstrap();
