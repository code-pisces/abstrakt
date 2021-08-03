"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnJSON = void 0;
const messages_1 = require("../utils/messages");
if (process.env.NODE_ENV !== 'production')
    require("dotenv").config();
const allowDevErrors = process.env.ALLOW_DEV_ERRORS || false;
/**
 * Middleware responsible for processing the response in json
 */
const returnJSON = (final, req, res, next) => {
    const acceptLanguage = req.acceptsLanguages(messages_1.getAllowedLanguages());
    const language = acceptLanguage ? acceptLanguage : "pt-BR";
    if (final.errors) {
        const error = final.errors.array({ onlyFirstError: true });
        return res.status(400).json({ status: 400, message: messages_1.getMessage(language, error[0]["msg"]) });
    }
    const json = {
        status: final.status || 404,
        message: messages_1.getMessage(language, final.messageType),
    };
    if (json.status == 401)
        json.message = messages_1.getMessage(language, "unauthorized");
    if (json.status == 404)
        json.message = messages_1.getMessage(language, "notfound");
    if (final.data)
        json.data = final.data;
    if (allowDevErrors)
        json.error = final.errorMessage;
    res.status(json.status).json(json);
};
exports.returnJSON = returnJSON;
