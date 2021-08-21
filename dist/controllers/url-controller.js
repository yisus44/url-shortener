"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendIndex = exports.redirect = exports.createShortUrl = void 0;
var path_1 = __importDefault(require("path"));
var util_1 = require("util");
var shortid_1 = __importDefault(require("shortid"));
var validator_1 = __importDefault(require("validator"));
var URL_1 = require("../models/URL");
var redis_1 = require("../database/redis");
var getAsync = util_1.promisify(redis_1.client.get).bind(redis_1.client);
var baseURL = 'https://flores-url-shorty.herokuapp.com';
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var longURL, exists, urlCode, shortURL, url, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    longURL = req.body.longURL;
                    if (isNotValidURL(longURL)) {
                        res.sendStatus(400);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, URL_1.URL.findOne({ longURL: longURL })];
                case 2:
                    exists = _a.sent();
                    if (exists) {
                        res.send(sendHTML(exists.shortURL));
                        return [2 /*return*/];
                    }
                    urlCode = shortid_1.default.generate();
                    shortURL = baseURL + "/" + urlCode;
                    url = new URL_1.URL({
                        shortURL: shortURL,
                        longURL: longURL,
                        urlCode: urlCode,
                    });
                    return [4 /*yield*/, url.save()];
                case 3:
                    _a.sent();
                    res.send(sendHTML(shortURL));
                    //its irrelevant for the client to know if its cached or not so we dont await or set a callback for this
                    redis_1.client.set(urlCode, longURL, function () {
                        console.log('cache set');
                    });
                    return [2 /*return*/];
                case 4:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.sendStatus(500);
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createShortUrl = createShortUrl;
function redirect(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var urlCode, cachedUrl, matchURL, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    urlCode = req.params.urlCode;
                    console.log('hola esquizo');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, getAsync(urlCode)];
                case 2:
                    cachedUrl = _a.sent();
                    if (cachedUrl) {
                        res.redirect(cachedUrl);
                    }
                    return [4 /*yield*/, URL_1.URL.findOne({ urlCode: urlCode })];
                case 3:
                    matchURL = _a.sent();
                    if (!matchURL) {
                        res.sendStatus(404);
                        return [2 /*return*/];
                    }
                    res.redirect(matchURL.longURL);
                    return [2 /*return*/];
                case 4:
                    error_2 = _a.sent();
                    res.send('We dont have that URL registered');
                    console.log(error_2);
                    return [2 /*return*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.redirect = redirect;
function sendIndex(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.sendFile(path_1.default.join(__dirname, '../client/index.html'));
            return [2 /*return*/];
        });
    });
}
exports.sendIndex = sendIndex;
function isNotValidURL(URL) {
    if (!URL || !validator_1.default.isURL(URL)) {
        return true;
    }
    return false;
}
function sendHTML(shortURL) {
    return "<p>Your url: <br><b>" + shortURL + "</b>";
}
