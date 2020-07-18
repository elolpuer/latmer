import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import * as session from 'express-session';
import * as passport from 'passport'
import * as redis from 'redis';
import * as connect from 'connect-redis'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const redisClient = redis.createClient()
  const redisStore = connect(session)

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
        },
    store: new redisStore({host: 'localhost', port: 6379, client: redisClient, ttl: '216000'})
      }
    )
  )

  app.use(passport.initialize());
  app.use(passport.session());
  
  await app.listen(5000);


}
bootstrap();
