import {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import Users from '../models/Users'

export const showPageRegister=async(req:Request,res:Response) => {

    res.render('pages/register')
}



export const createUser=async(req:Request,res:Response) => {
    let showAlert=false
    try {
        const {username,email,password}=req.body
        if(username && email && password) {

                let showUsers = await Users.findOne({
                $or:[
                    {email:email},
                    {username:username}
                ]
            })

            const hash=bcrypt.hashSync(password,10)

            if(!showUsers) {
                console.log('Hash antes do create:', hash);
                let createdUser=await Users.create({username:username,email:email,password:hash})
                if(req.session) {
                    let newSesh=req.session.username=createdUser.username
                    console.log(`usuarioDaSessão:${newSesh}`);
                }
                
                
                if(createdUser) {
                    res.redirect('/')
                }
            }
            else {
                let mensage= 'User already exists ...'
                showAlert=true
                res.render('pages/register',{
                    showAlert,
                    mensage
                })
            }
        }
        else {
            let mensage= 'Fill in the fields to proceed !'
            showAlert=true
            res.render('pages/register',{
                showAlert,
                mensage
            })
        }
    }

    catch(error) {
        res.json({status:"Erro no registro"})
        console.log(error)
    }

}
