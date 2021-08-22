"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("./database/db");
require("./database/redis");
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var url_router_1 = require("./routes/url-router");
var app = express_1.default();
exports.app = app;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(helmet_1.default());
app.use(morgan_1.default('common'));
app.use(url_router_1.urlRouter);
