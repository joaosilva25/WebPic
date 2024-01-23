"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUsers = exports.userLogout = exports.onUser = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const onUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let showAlertUser = false;
    let msgForUser;
    const { email, password } = req.body;
    console.log(`campo de email:${email}`);
    console.log(`campo de senha:${password}`);
    if (req.session && req.session.username) {
        console.log('você já está logado');
        next();
    }
    else {
        if (email && password) {
            const userExist = yield Users_1.default.findOne({
                email: email,
            });
            if (userExist) {
                const passwordMatch = yield bcryptjs_1.default.compare(password, userExist.password);
                if (passwordMatch) {
                    if (req.session) {
                        let nameSesh = req.session.username = userExist.username;
                        console.log(`sessão conectada: ${nameSesh}`);
                        console.log(`ID Session: ${req.sessionID}`);
                        next();
                    }
                }
                else {
                    showAlertUser = true;
                    msgForUser = "Incorrect Password";
                    res.render('pages/home', {
                        msgForUser,
                        showAlertUser
                    });
                }
            }
            else {
                showAlertUser = true;
                msgForUser = "User not found";
                res.render('pages/home', {
                    msgForUser,
                    showAlertUser
                });
            }
        }
        else {
            showAlertUser = true;
            msgForUser = "Log in or create a user account to continue.";
            res.render('pages/home', {
                showAlertUser,
                msgForUser
            });
        }
    }
});
exports.onUser = onUser;
const userLogout = (req, res) => {
    console.log(req.session);
    if (req.session) {
        let usernameDestroy = req.session.username;
        req.session.destroy((err) => {
            console.log(`Sessão de ${usernameDestroy} encerrada com sucesso`);
            res.redirect('/');
        });
    }
};
exports.userLogout = userLogout;
const showUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let showElements = false;
    let showUserForm = true;
    if (req.session && req.session.username !== undefined) {
        showElements = true;
        showUserForm = false;
        let showName = yield req.session.username;
        res.locals.showElements = showElements;
        res.locals.showUserForm = showUserForm;
        res.locals.showName = showName;
        next();
    }
    else {
        showElements = false;
        showUserForm = true;
        res.locals.showElements = showElements;
        res.locals.showUserForm = showUserForm;
        next();
    }
});
exports.showUsers = showUsers;
