import {Request,Response, NextFunction} from 'express';
import Users from '../models/Users'
import bcryptjs from 'bcryptjs'



export const onUser = async(req:Request,res:Response,next:NextFunction)=> {
    let showAlertUser = false;
    let msgForUser;

    const {email,password} = req.body;
    console.log(`campo de email:${email}`)
    console.log(`campo de senha:${password}`)

    if(req.session && req.session.username) {
        console.log('você já está logado')
        next()
    }
    else {
        if(email && password) {
            const userExist = await Users.findOne( {
                email:email,
            })

            if (userExist) {
                const passwordMatch = await bcryptjs.compare(password,userExist.password)
                if (passwordMatch) {
                    if(req.session) {
                        let nameSesh=req.session.username=userExist.username
                        console.log(`sessão conectada: ${nameSesh}`)
                        console.log(`ID Session: ${req.sessionID}`)
                        next()
                    }
                }
                else {
                    showAlertUser=true
                    msgForUser="Incorrect Password"
                    res.render('pages/home', {
                        msgForUser,
                        showAlertUser
                    })
                }
            }
            
            else {
                showAlertUser=true
                msgForUser="User not found"
                res.render('pages/home', {
                    msgForUser,
                    showAlertUser
                })
            }
        }
        else {
            showAlertUser=true
            msgForUser="Log in or create a user account to continue."
            res.render('pages/home', {
                showAlertUser,
                msgForUser
            })
        }

    }
}

export const userLogout=(req: Request, res: Response) => {
    console.log(req.session)
    if(req.session) {
        let usernameDestroy=req.session.username
        req.session.destroy((err)=>{
            console.log(`Sessão de ${usernameDestroy} encerrada com sucesso`)
            res.redirect('/')
        })
    }
}


export const showUsers = async (req: Request, res: Response, next:NextFunction) => {
    let showElements=false
    let showUserForm=true

    if(req.session && req.session.username!==undefined) {
        showElements=true
        showUserForm=false
        let showName = await req.session.username
        res.locals.showElements=showElements
        res.locals.showUserForm=showUserForm
        res.locals.showName=showName
        next()
    }
    else {
        showElements=false
        showUserForm=true
        res.locals.showElements=showElements
        res.locals.showUserForm=showUserForm
        next()
    }
}


