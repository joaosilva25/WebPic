import nodemailer from 'nodemailer';
import Users from '../models/Users';
import bcryptjs from 'bcryptjs'
import {NextFunction, Request,Response} from 'express';


let action;
let emailField;
let confirmationField;
let passwordField;
let forUserMsg:string;
let showAlert=false;
let status;


export const showEmailConfirm = (req: Request, res: Response) => {
    emailField = true;
    action='/new-password'
    status='Confirmate your email'
    showAlert=false
    res.render('pages/newPassword', {
        emailField,
        action,
        status,
        
    })
}

export const showCodeConfirm = (req: Request, res: Response) => {
    confirmationField = true
    emailField = false
    showAlert=false
    action='/new-password/codeConfirmation'
    status='Confirmate code'

    res.render('pages/newPassword', {
        confirmationField,
        emailField,
        action,
        status,
    })

}

export const showCreateNewPass=(req: Request, res: Response) => {
    passwordField = true;
    emailField = false;
    showAlert=false
    confirmationField = false;
    action='/new-password/createPassword'
    status='Create new Password'

    res.render('pages/newPassword', {
        passwordField,
        emailField,
        confirmationField,
        action,
        status,
    })

}



export const sendEmail = async(req:Request,res:Response,next:NextFunction)=> {
    

    let aleatoryCode = Math.floor(Math.random() *1000000000).toString()

    let {email}=req.body

    if(email=="") {
        forUserMsg='Complete the field to continue'
        showAlert=true;
        emailField = true;
        action='/new-password'
        status='Confirmate your email'
        res.render('pages/newPassword', {
        emailField,
        action,
        status,
        forUserMsg,
        showAlert
    })
    }

    let userExist= await Users.findOne({email})

    if(userExist) {
        userExist.code=aleatoryCode
        await userExist.save()

        if(req.session) {
            let sesh=req.session.user=userExist
            console.log(`Sessão:${sesh}`)
        }


        try {
            var transport = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "joaosilva20012505@gmail.com",
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            let message = {
                from:'joaosilva20012505@gmail.com',
                to:email,
                subject:'Confirmation e-mail code',
                html:`<h5>${aleatoryCode}</h5>`
            }


            let sendedEmail=await transport.sendMail(message)

            if(sendedEmail) {
                console.log(sendedEmail)
                return res.redirect('/new-password/codeConfirmation')
            }
        }
        catch(err) {
            res.status(500).send('Unexpected error try again later')
        }
    
        forUserMsg='User not exist'
        emailField = true;
        action='/new-password'
        status='Confirmate your email'
        showAlert=true;
        res.render('pages/newPassword', {
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        })
    }
}

export const confirmateCode=(req:Request, res:Response) => {
    let {codeConfirm}=req.body;

    if(codeConfirm=="") {
        forUserMsg='Complete the field to continue'
        confirmationField = true
        emailField = false
        action='/new-password/codeConfirmation'
        status='Confirmate code'
        showAlert=true;

        return res.render('pages/newPassword', {
            confirmationField,
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        })
    }

    let codeSesh;

    try {
        if (req.session) {
            codeSesh=req.session.user.code

            if(codeConfirm===codeSesh) {
                return res.redirect('/new-password/createPassword')
            }
        }

        forUserMsg='Incorrect codeConfirmation'
        confirmationField = true
        emailField = false
        action='/new-password/codeConfirmation'
        status='Confirmate code'
        showAlert=true
                
        res.render('pages/newPassword', {
            confirmationField,
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        })
    }
    catch(error) {
        res.status(500).send('Unexpected error try again later')
    }
}


export const createNewPass=async(req:Request, res:Response)=> {
    let {newPass}=req.body;

    if(newPass=="") {
        forUserMsg='Complete the field to continue'
        passwordField = true;
        emailField = false;
        confirmationField = false;
        action='/new-password/createPassword'
        status='Create new Password'
        showAlert=true;

        return res.render('pages/newPassword', {
        passwordField,
        emailField,
        confirmationField,
        action,
        status,
        forUserMsg,
        showAlert
    })
    }

    let passHash;


    try {
        if(newPass) {
            passHash= bcryptjs.hashSync(newPass,10)
        }

        if (req.session) {

            let emailUser=req.session.user.email

            if (emailUser) {
                console.log(`senha anterior ${req.session.user.password}`)

                let passUpdate= await Users.updateOne(
                    {email:emailUser},
                    {password:passHash}
                )

                if (passUpdate) {
                    console.log(`Senha atualizada: ${passHash}`)
                    return res.redirect('/')
                }

                forUserMsg='Your password not was updated'
                passwordField = true;
                emailField = false;
                confirmationField = false;
                action='/new-password/createPassword'
                status='Create new Password'
                showAlert=true;
                res.render('pages/newPassword', {
                    passwordField,
                    emailField,
                    confirmationField,
                    action,
                    status,
                    forUserMsg,
                    showAlert
                })
            }
        }
    }
    catch (error) {
        res.status(500).send('Unexpected error try again later');
    }
}


