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
exports.createUser = exports.showPageRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Users_1 = __importDefault(require("../models/Users"));
const showPageRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('pages/register');
});
exports.showPageRegister = showPageRegister;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let showAlert = false;
    try {
        const { username, email, password } = req.body;
        if (username && email && password) {
            let showUsers = yield Users_1.default.findOne({
                $or: [
                    { email: email },
                    { username: username }
                ]
            });
            const hash = bcryptjs_1.default.hashSync(password, 10);
            if (!showUsers) {
                let createdUser = yield Users_1.default.create({ username: username, email: email, password: hash });
                if (req.session) {
                    let newSesh = req.session.username = createdUser.username;
                }
                if (createdUser) {
                    res.redirect('/');
                }
            }
            else {
                let mensage = 'User already exists ...';
                showAlert = true;
                res.render('pages/register', {
                    showAlert,
                    mensage
                });
            }
        }
        else {
            let mensage = 'Fill in the fields to proceed !';
            showAlert = true;
            res.render('pages/register', {
                showAlert,
                mensage
            });
        }
    }
    catch (error) {
        res.json({ status: "Erro no registro" });
        console.log(error);
    }
});
exports.createUser = createUser;
