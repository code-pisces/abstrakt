"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = exports.corsPreflight = void 0;
const cors_1 = __importDefault(require("cors"));
const whitelist = process.env.ALLOWED_ORIGIN?.replace(/\s/g, '').split(",");
exports.corsPreflight = cors_1.default({
    origin: whitelist,
    methods: ["GET", "PUT", "POST", "DELETE"],
    maxAge: 86400,
});
exports.corsMiddleware = cors_1.default({
    origin: (origin, callback) => {
        if (whitelist?.indexOf(origin || "") !== -1)
            callback(null, true);
        else
            callback(new Error("cors"));
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 204,
});
