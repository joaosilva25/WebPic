"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const linksController = __importStar(require("../controllers/linksController"));
const registerController = __importStar(require("../controllers/registerController"));
const userController = __importStar(require("../controllers/userController"));
const emailController = __importStar(require("../controllers/newPassController"));
const userController_1 = require("../controllers/userController");
const routes = (0, express_1.Router)();
routes.get('/', userController_1.showUsers, (req, res) => {
    res.render('pages/home');
});
routes.get('/login', userController_1.showUsers, linksController.logged);
routes.post('/login', userController_1.showUsers, userController.onUser, userController_1.showUsers, linksController.logged);
routes.get('/list/all', userController_1.showUsers, userController.onUser, linksController.allArea);
routes.get('/list/animals', userController_1.showUsers, userController.onUser, linksController.animalsArea);
routes.get('/list/landscape', userController_1.showUsers, userController.onUser, linksController.landscapeArea);
routes.get('/list/vaporwave', userController_1.showUsers, userController.onUser, linksController.vaporwaveArea);
routes.get('/register', userController_1.showUsers, registerController.showPageRegister);
routes.post('/register', userController_1.showUsers, registerController.createUser);
routes.get('/logout', userController_1.showUsers, userController.userLogout);
routes.get('/new-password', userController_1.showUsers, emailController.showEmailConfirm);
routes.post('/new-password', userController_1.showUsers, emailController.sendEmail, emailController.confirmateCode);
routes.get('/new-password/codeConfirmation', userController_1.showUsers, emailController.showCodeConfirm);
routes.post('/new-password/codeConfirmation', userController_1.showUsers, emailController.confirmateCode);
routes.get('/new-password/createPassword', userController_1.showUsers, emailController.showCreateNewPass);
routes.post('/new-password/createPassword', userController_1.showUsers, emailController.createNewPass);
exports.default = routes;
