"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const appRoutes_1 = __importDefault(require("./routes/appRoutes"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const mongo_1 = require("./database/mongo");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const memorystore_1 = __importDefault(require("memorystore"));
dotenv_1.default.config();
(0, mongo_1.mongoConnect)();
const Server = (0, express_1.default)();
const MemoryStore = (0, memorystore_1.default)(express_session_1.default);
Server.use((0, express_session_1.default)({
    secret: process.env.SESSION_KEY,
    resave: false,
    store: new MemoryStore({
        checkPeriod: 86400000 // remove entradas expiradas a cada 24h 
    }),
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
Server.set('view engine', 'mustache');
Server.set('views', path_1.default.join(path_1.default.join(__dirname, 'views')));
Server.engine('mustache', (0, mustache_express_1.default)());
Server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
Server.use(express_1.default.urlencoded({ extended: true }));
Server.use('/node_modules', express_1.default.static(__dirname + '/node_modules'));
Server.use(passport_1.default.initialize());
Server.use(appRoutes_1.default);
Server.use((req, res) => {
    res.status(404);
    res.send('Page not found');
});
Server.listen(process.env.PORT);
