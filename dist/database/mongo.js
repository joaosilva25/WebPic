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
exports.mongoConnect = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./database"));
dotenv_1.default.config();
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Conectando ao BD');
        yield (0, mongoose_1.connect)(database_1.default.db);
        console.log('BD connected');
    }
    catch (err) {
        console.log('Erro na conexão');
    }
});
exports.mongoConnect = mongoConnect;
