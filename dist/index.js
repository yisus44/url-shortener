"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: __dirname + '/.env' });
var os_1 = require("os");
var process_1 = __importDefault(require("process"));
var cluster_1 = __importDefault(require("cluster"));
var app_1 = require("./app");
var numCPUs = os_1.cpus().length;
var PORT = Number(process_1.default.env.PORT) || 8000;
//TODO: Change it to .isPrimary when 16 or more become stable
if (cluster_1.default.isMaster) {
    console.log("Primary " + process_1.default.pid + " is running");
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code, signal) {
        //Loggin stuff
        console.log("Worker " + worker + " endend, reasons:");
        if (signal) {
            console.log("worker was killed by signal: " + signal);
        }
        else if (code !== 0) {
            console.log("worker exited with error code: " + code);
        }
        else {
            console.log('worker success!');
        }
    });
}
else {
    console.log("Worker " + process_1.default.pid + " started");
    app_1.app.listen(PORT, function () {
        console.log('Server up and running on port', PORT);
    });
}
