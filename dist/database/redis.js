"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
var redis_1 = __importDefault(require("redis"));
var password = process.env.REDIS_PASSWORD;
var host = process.env.REDIS_HOST;
var port = Number(process.env.REDIS_PORT);
var client = redis_1.default.createClient({
    host: host,
    port: port,
    password: password,
});
exports.client = client;
client.on('ready', function () {
    console.log('Redis instance up and running!');
});
client.on('error', function (error) {
    console.log(error);
});
