import express,{Request, Response} from 'express';
import dotenv from 'dotenv'
import path from 'path';
import homeRouter from '../src/routes/home'
import mustache from 'mustache-express'
import { mongoConnect } from './database/mongo';
import passport from 'passport'
import session from 'express-session';


dotenv.config()
mongoConnect()

const Server = express()


Server.use(session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    saveUninitialized: true,
    cookie:{ 
      secure: false
    }
}))


Server.set('view engine', 'mustache')
Server.set('views',path.join(__dirname,'views'))
Server.engine('mustache', mustache())


Server.use(express.static(path.join(__dirname, '../public')))
Server.use(express.urlencoded({extended:true}))

Server.use(passport.initialize())

Server.use(homeRouter)

Server.use((req:Request, res:Response) => {
    res.status(404)
    res.send('Page not found')
})

Server.listen(process.env.PORT)