import { Request, NextFunction, Response } from 'express';
/**
 * Google OAuth 2 Authenticate with token
 * @param token Token JWT obtained through google login
 */
export declare const googleOAuthAuthenticate: (req: Request, res: Response, next: NextFunction) => void;
