"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/.env' });
var app_1 = require("./app");
var PORT = Number(process.env.PORT) || 8000;
app_1.app.listen(PORT, function () {
    console.log('Server up and running on port', PORT);
});
