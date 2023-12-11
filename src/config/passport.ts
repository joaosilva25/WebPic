import passport from 'passport';
import { BasicStrategy } from 'passport-http';
import Users from '../models/Users'


passport.use(new BasicStrategy((email,password,done)=> {
    let userLogged=false
    if(email && password) {
        const identifyUser = Users.findOne({
        $and: [
            {email:email},
            {password:password}
        ]
        })
        if(identifyUser) {
            userLogged=true;
            return done(null,identifyUser);
        }
    }
    return done(console.log("Não autorizado"),false)
}));

const basicAuthMiddleware = passport.authenticate('basic');


export default basicAuthMiddleware
