import { NextFunction, Response, Request } from "express";
import { Result, ValidationError } from "express-validator";

import { getMessage, getAllowedLanguages } from '../utils/messages';

const allowDevErrors = process.env.NODE_ENV !== "production" ? true : false;

export interface IFinalNext extends Error {
    status: number;
    data?: Array<Object> | object;
    messageType?: string;
    errors?: Result<ValidationError>;
    errorMessage?: string;
}

interface IApiJson extends Object {
    status: number;
    data?: Array<Object> | object;
    message?: string;
    error?: string;
}

/**
 * Middleware responsible for processing the response in json
 */

export const returnJSON = (final: IFinalNext, req: Request, res: Response, next: NextFunction) => {
    const acceptLanguage: string | false = req.acceptsLanguages(getAllowedLanguages());
    const language: string = acceptLanguage ? acceptLanguage : "pt-BR";

    if(final.errors){
        const error = final.errors.array({ onlyFirstError: true });
        return res.status(400).json({ status: 400, message: getMessage(language, error[0]["msg"]) });
    }

    const json: IApiJson = {
        status: final.status || 400,
        message: getMessage(language, final.messageType),
        data: final.data
    }

    if(json.status == 401)
        json.message = getMessage(language, "unauthorized");

    if(allowDevErrors)
        json.error = final.errorMessage

    if(final.name == "Error"){
        json.status = 401;
        json.message = getMessage(language, final.message);
    }

    res.status(json.status).json(json);
};