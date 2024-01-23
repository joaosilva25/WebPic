"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const Users_1 = __importDefault(require("../models/Users"));
passport_1.default.use(new passport_http_1.BasicStrategy((email, password, done) => {
    let userLogged = false;
    if (email && password) {
        const identifyUser = Users_1.default.findOne({
            $and: [
                { email: email },
                { password: password }
            ]
        });
        if (identifyUser) {
            userLogged = true;
            return done(null, identifyUser);
        }
    }
    return done(console.log("Não autorizado"), false);
}));
const basicAuthMiddleware = passport_1.default.authenticate('basic');
exports.default = basicAuthMiddleware;
