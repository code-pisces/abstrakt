"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnJSON = void 0;
const messages_1 = require("../utils/messages");
const allowDevErrors = process.env.NODE_ENV !== "production" ? true : false;
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
        status: final.status || 400,
        message: messages_1.getMessage(language, final.messageType),
        data: final.data
    };
    if (json.status == 401)
        json.message = messages_1.getMessage(language, "unauthorized");
    if (allowDevErrors)
        json.error = final.errorMessage;
    if (final.name == "Error") {
        json.status = 401;
        json.message = messages_1.getMessage(language, final.message);
    }
    res.status(json.status).json(json);
};
exports.returnJSON = returnJSON;
