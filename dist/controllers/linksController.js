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
exports.vaporwaveArea = exports.landscapeArea = exports.animalsArea = exports.allArea = exports.logged = void 0;
const Links_1 = __importDefault(require("../models/Links"));
const logged = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect('/');
});
exports.logged = logged;
const allArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allLinks = yield Links_1.default.find();
    res.render('pages/list', {
        allLinks
    });
});
exports.allArea = allArea;
const animalsArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const animals = 'animals';
    let allLinks = yield Links_1.default.find({ type: animals });
    res.render('pages/list', {
        allLinks
    });
});
exports.animalsArea = animalsArea;
const landscapeArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const landscape = 'landscape';
    let allLinks = yield Links_1.default.find({ type: landscape });
    res.render('pages/list', {
        allLinks
    });
});
exports.landscapeArea = landscapeArea;
const vaporwaveArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vaporwave = 'vaporwave';
    let allLinks = yield Links_1.default.find({ type: vaporwave });
    res.render('pages/list', {
        allLinks
    });
});
exports.vaporwaveArea = vaporwaveArea;
