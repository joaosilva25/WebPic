"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    type: { type: String, required: true },
    href: { type: String, required: true }
});
const linksModel = 'links';
exports.default = (_a = (mongoose_1.connection && mongoose_1.connection.models[linksModel])) !== null && _a !== void 0 ? _a : (0, mongoose_1.model)(linksModel, exports.schema);
