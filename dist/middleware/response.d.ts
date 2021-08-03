import { NextFunction, Response, Request } from "express";
import { Result, ValidationError } from "express-validator";
export interface IFinalNext extends Error {
    status: number;
    data?: Array<Object> | object;
    messageType?: string;
    errors?: Result<ValidationError>;
    errorMessage?: string;
}
/**
 * Middleware responsible for processing the response in json
 */
export declare const returnJSON: (final: IFinalNext, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
