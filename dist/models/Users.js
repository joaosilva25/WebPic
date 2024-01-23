"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    code: String
});
const modelName = 'users';
exports.default = (_a = (mongoose_1.connection && mongoose_1.connection.models[modelName])) !== null && _a !== void 0 ? _a : (0, mongoose_1.model)(modelName, exports.schema);
