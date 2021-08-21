"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
var mongoose_1 = require("mongoose");
var URLSchema = new mongoose_1.Schema({
    urlCode: { type: String },
    shortURL: { type: String },
    longURL: {
        type: String,
        required: true,
    },
    createdAt: { type: String, default: Date.now },
});
var URL = mongoose_1.model('URL', URLSchema);
exports.URL = URL;
