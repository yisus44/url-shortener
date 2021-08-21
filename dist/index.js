"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/.env' });
var app_1 = require("./app");
var throng_1 = __importDefault(require("throng"));
var PORT = Number(process.env.PORT) || 8000;
var WORKERS = Number(process.env.WEB_CONCURRENCY) || 1;
throng_1.default(function () { return start(); });
function start() {
    app_1.app.listen(PORT, function () {
        console.log('Server up and running on port', PORT);
    });
}
