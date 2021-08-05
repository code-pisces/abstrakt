"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRateLimit = exports.LoginRateLimit = exports.GeneralRateLimit = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const MaxRequestPerHour = 2000;
const MaxTryLoginForFiveMinutes = 5;
const MaxTryRegisterForFiveMinutes = 5;
exports.GeneralRateLimit = express_rate_limit_1.default({
    windowMs: 60 * 60 * 1000,
    max: MaxRequestPerHour
});
exports.LoginRateLimit = express_rate_limit_1.default({
    windowMs: 5 * 60 * 1000,
    max: MaxTryLoginForFiveMinutes
});
exports.RegisterRateLimit = express_rate_limit_1.default({
    windowMs: 5 * 60 * 1000,
    max: MaxTryRegisterForFiveMinutes
});
