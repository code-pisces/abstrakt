"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleOAuthAuthenticate = void 0;
const google_auth_library_1 = require("google-auth-library");
const { GOOGLE_ID, GOOGLE_SECRET, TOKEN_SECRET } = process.env;
const client = new google_auth_library_1.OAuth2Client(GOOGLE_ID, GOOGLE_SECRET);
/**
 * Google OAuth 2 Authenticate with token
 * @param token Token JWT obtained through google login
 */
const googleOAuthAuthenticate = (req, res, next) => {
    const token = req.body.token;
    if (!token)
        return next({ status: 401, messageType: "invalid_google_token" });
    client.verifyIdToken({ idToken: token, audience: GOOGLE_ID }, (err, login) => {
        if (err || login === undefined)
            return next({ status: 401, messageType: "invalid_google_token" });
        res.locals["google_token"] = token;
        res.locals['google_payload'] = login.getPayload();
        next();
    });
};
exports.googleOAuthAuthenticate = googleOAuthAuthenticate;
