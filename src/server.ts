import express,{Request, Response} from 'express';
import dotenv from 'dotenv'
import path from 'path';
import appRoutes from './routes/appRoutes'
import mustacheExpress from 'mustache-express'
import { mongoConnect } from './database/mongo';
import passport from 'passport'
import session from 'express-session';
import createMemoryStore  from 'memorystore'

dotenv.config()
mongoConnect()

const Server = express()


const MemoryStore = createMemoryStore(session);


Server.use(session({
    secret: process.env.SESSION_KEY as string,
    resave: false,
    store : new  MemoryStore ( { 
      checkPeriod : 86400000  // remove entradas expiradas a cada 24h 
    }),
    saveUninitialized: true,
    cookie:{ 
      secure: false
    }
}))

Server.engine('mustache', mustacheExpress());
Server.set('view engine', 'mustache');
Server.set('views', path.join(__dirname, 'views'));


Server.use(express.static(path.join(__dirname, '../public')))
Server.use(express.urlencoded({extended:true}))
Server.use('/node_modules', express.static(__dirname + '/node_modules'));


Server.use(passport.initialize())

Server.use(appRoutes)

Server.use((req:Request, res:Response) => {
    res.status(404)
    res.send('Page not found')
})

Server.listen(process.env.PORT)