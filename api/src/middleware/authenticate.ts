import passport from "passport";

/**
 * JWT Authentication middleware
 * @param token Authorization header must contain a valid jwt access token
 */

export const authenticate = passport.authenticate("jwt", { session: false, failWithError: true });