"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = void 0;
var keys = {
    MONGODB_URI: String(process.env.MONGODB_URI),
    PORT: Number(process.env.PORT) || 3000,
    SALT_ROUND: Number(process.env.SALT_ROUND) || 10,
    JWT_SECRET: String(process.env.JWT_SECRET),
};
exports.keys = keys;
