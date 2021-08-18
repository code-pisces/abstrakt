import { Request, NextFunction, Response } from 'express';
import { LoginTicket, OAuth2Client } from 'google-auth-library';

const { GOOGLE_ID, GOOGLE_SECRET, TOKEN_SECRET } = process.env;

const client = new OAuth2Client(GOOGLE_ID, GOOGLE_SECRET);

/**
 * Google OAuth 2 Authenticate with token 
 * @param token Token JWT obtained through google login
 */

export const googleOAuthAuthenticate = (req: Request, res: Response, next: NextFunction) => {
    const id_token: string = req.body.token;

    if(!id_token)
        return next({ status: 400, messageType: "empty_google_token" });

    client.verifyIdToken({ idToken: id_token, audience: GOOGLE_ID }, (err: Error | null, login: LoginTicket | undefined) => {
        if(err)
            return next({ status: 400, messageType: "error_google_token", errorMessage: err.message });
        
        if(login == undefined)
            return next({ status: 401, messageType: "invalid_google_token" });
            
        res.locals["google_token"] = id_token;
        res.locals['google_payload'] = login.getPayload();
        next();
    })
}