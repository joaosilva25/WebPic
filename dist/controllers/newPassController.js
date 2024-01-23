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
exports.createNewPass = exports.confirmateCode = exports.sendEmail = exports.showCreateNewPass = exports.showCodeConfirm = exports.showEmailConfirm = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const Users_1 = __importDefault(require("../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let action;
let emailField;
let confirmationField;
let passwordField;
let forUserMsg;
let showAlert = false;
let status;
const showEmailConfirm = (req, res) => {
    emailField = true;
    action = '/new-password';
    status = 'Confirmate your email';
    showAlert = false;
    res.render('pages/newPassword', {
        emailField,
        action,
        status,
    });
};
exports.showEmailConfirm = showEmailConfirm;
const showCodeConfirm = (req, res) => {
    confirmationField = true;
    emailField = false;
    showAlert = false;
    action = '/new-password/codeConfirmation';
    status = 'Confirmate code';
    res.render('pages/newPassword', {
        confirmationField,
        emailField,
        action,
        status,
    });
};
exports.showCodeConfirm = showCodeConfirm;
const showCreateNewPass = (req, res) => {
    passwordField = true;
    emailField = false;
    showAlert = false;
    confirmationField = false;
    action = '/new-password/createPassword';
    status = 'Create new Password';
    res.render('pages/newPassword', {
        passwordField,
        emailField,
        confirmationField,
        action,
        status,
    });
};
exports.showCreateNewPass = showCreateNewPass;
const sendEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let aleatoryCode = Math.floor(Math.random() * 1000000000).toString();
    let { email } = req.body;
    if (email == "") {
        forUserMsg = 'Complete the field to continue';
        showAlert = true;
        emailField = true;
        action = '/new-password';
        status = 'Confirmate your email';
        res.render('pages/newPassword', {
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        });
    }
    let userExist = yield Users_1.default.findOne({ email });
    if (userExist) {
        userExist.code = aleatoryCode;
        yield userExist.save();
        if (req.session) {
            let sesh = req.session.user = userExist;
            console.log(`Sessão:${sesh}`);
        }
        try {
            var transport = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "joaosilva20012505@gmail.com",
                    pass: process.env.GMAIL_PASSWORD
                }
            });
            let message = {
                from: 'joaosilva20012505@gmail.com',
                to: email,
                subject: 'Confirmation e-mail code',
                html: `<h5>${aleatoryCode}</h5>`
            };
            let sendedEmail = yield transport.sendMail(message);
            if (sendedEmail) {
                console.log(sendedEmail);
                return res.redirect('/new-password/codeConfirmation');
            }
        }
        catch (err) {
            res.status(500).send('Unexpected error try again later');
        }
        forUserMsg = 'User not exist';
        emailField = true;
        action = '/new-password';
        status = 'Confirmate your email';
        showAlert = true;
        res.render('pages/newPassword', {
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        });
    }
});
exports.sendEmail = sendEmail;
const confirmateCode = (req, res) => {
    let { codeConfirm } = req.body;
    if (codeConfirm == "") {
        forUserMsg = 'Complete the field to continue';
        confirmationField = true;
        emailField = false;
        action = '/new-password/codeConfirmation';
        status = 'Confirmate code';
        showAlert = true;
        return res.render('pages/newPassword', {
            confirmationField,
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        });
    }
    let codeSesh;
    try {
        if (req.session) {
            codeSesh = req.session.user.code;
            if (codeConfirm === codeSesh) {
                return res.redirect('/new-password/createPassword');
            }
        }
        forUserMsg = 'Incorrect codeConfirmation';
        confirmationField = true;
        emailField = false;
        action = '/new-password/codeConfirmation';
        status = 'Confirmate code';
        showAlert = true;
        res.render('pages/newPassword', {
            confirmationField,
            emailField,
            action,
            status,
            forUserMsg,
            showAlert
        });
    }
    catch (error) {
        res.status(500).send('Unexpected error try again later');
    }
};
exports.confirmateCode = confirmateCode;
const createNewPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { newPass } = req.body;
    if (newPass == "") {
        forUserMsg = 'Complete the field to continue';
        passwordField = true;
        emailField = false;
        confirmationField = false;
        action = '/new-password/createPassword';
        status = 'Create new Password';
        showAlert = true;
        return res.render('pages/newPassword', {
            passwordField,
            emailField,
            confirmationField,
            action,
            status,
            forUserMsg,
            showAlert
        });
    }
    let passHash;
    try {
        if (newPass) {
            passHash = bcryptjs_1.default.hashSync(newPass, 10);
        }
        if (req.session) {
            let emailUser = req.session.user.email;
            if (emailUser) {
                console.log(`senha anterior ${req.session.user.password}`);
                let passUpdate = yield Users_1.default.updateOne({ email: emailUser }, { password: passHash });
                if (passUpdate) {
                    console.log(`Senha atualizada: ${passHash}`);
                    return res.redirect('/');
                }
                forUserMsg = 'Your password not was updated';
                passwordField = true;
                emailField = false;
                confirmationField = false;
                action = '/new-password/createPassword';
                status = 'Create new Password';
                showAlert = true;
                res.render('pages/newPassword', {
                    passwordField,
                    emailField,
                    confirmationField,
                    action,
                    status,
                    forUserMsg,
                    showAlert
                });
            }
        }
    }
    catch (error) {
        res.status(500).send('Unexpected error try again later');
    }
});
exports.createNewPass = createNewPass;
