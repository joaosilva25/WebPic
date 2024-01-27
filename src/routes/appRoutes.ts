import express, { Request, Response, Router } from 'express'; 
import * as linksController from '../controllers/linksController'
import * as registerController from '../controllers/registerController'
import * as userController from '../controllers/userController'
import * as emailController from '../controllers/newPassController'
import { showUsers } from '../controllers/userController';


const routes = Router()


routes.get('/',showUsers, (req:Request, res:Response) => {
    res.render('pages/home')
})

routes.get('/login',showUsers,linksController.logged)
routes.post('/login',showUsers,userController.onUser,showUsers,linksController.logged)
routes.get('/list/all',showUsers,userController.onUser,linksController.allArea)
routes.get('/list/animals',showUsers,userController.onUser,linksController.animalsArea)
routes.get('/list/landscape',showUsers,userController.onUser,linksController.landscapeArea)
routes.get('/list/vaporwave',showUsers,userController.onUser,linksController.vaporwaveArea)
routes.get('/register',showUsers,registerController.showPageRegister)
routes.post('/register',showUsers,registerController.createUser)
routes.get('/logout',showUsers,userController.userLogout)
routes.get('/new-password',showUsers,emailController.showEmailConfirm)
routes.post('/new-password',showUsers,emailController.sendEmail,emailController.confirmateCode)
routes.get('/new-password/codeConfirmation',showUsers,emailController.showCodeConfirm)
routes.post('/new-password/codeConfirmation',showUsers,emailController.confirmateCode)
routes.get('/new-password/createPassword',showUsers,emailController.showCreateNewPass)
routes.post('/new-password/createPassword',showUsers,emailController.createNewPass)



export default routes