"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_1 = __importDefault(require("passport"));
/**
 * JWT Authentication middleware
 * @param token Authorization header must contain a valid jwt access token
 */
exports.authenticate = passport_1.default.authenticate("jwt", { session: false, failWithError: true });
