import express, { Request, Response, Router } from 'express'; 
import * as homeController from '../controllers/homeController'
import * as registerController from '../controllers/registerController'
import * as userController from '../controllers/userController'
import * as emailController from '../controllers/newPassController'
import { showUsers } from '../controllers/userController';


const routes = Router()


routes.get('/',showUsers, (req:Request, res:Response) => {
    res.render('pages/home')
})

routes.get('/login',showUsers,homeController.logged)
routes.post('/login',showUsers,userController.onUser,showUsers,homeController.logged)
routes.get('/list/all',showUsers,userController.onUser,homeController.allArea)
routes.get('/list/animals',showUsers,userController.onUser,homeController.animalsArea)
routes.get('/list/landscape',showUsers,userController.onUser,homeController.landscapeArea)
routes.get('/list/vaporwave',showUsers,userController.onUser,homeController.vaporwaveArea)
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