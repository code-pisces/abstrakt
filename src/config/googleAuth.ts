import { Request, NextFunction, Response } from 'express';
import { LoginTicket, OAuth2Client } from 'google-auth-library';

const { GOOGLE_ID, GOOGLE_SECRET, TOKEN_SECRET } = process.env;

const client = new OAuth2Client(GOOGLE_ID, GOOGLE_SECRET);

/**
 * Google OAuth 2 Authenticate with token 
 * @param token Token JWT obtained through google login
 */

export const googleOAuthAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.body.token;

    if(!token)
        return next({ status: 401, messageType: "invalid_google_token" });

    client.verifyIdToken({ idToken: token, audience: GOOGLE_ID }, (err: Error | null, login: LoginTicket | undefined) => {
        if(err || login === undefined)
            return next({ status: 401, messageType: "invalid_google_token" });
        
        res.locals["google_token"] = token;
        res.locals['google_payload'] = login!.getPayload();
        next();
    })
}