"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_local_1 = require("passport-local");
const User_1 = require("../models/User");
function passportConfig(passport) {
    /**
     * JWT authentication middleware
     */
    var options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: process.env.TOKEN_SECRET,
    };
    passport.use("jwt", new passport_jwt_1.Strategy(options, (jwtPayload, done) => {
        User_1.User.findOne({ _id: jwtPayload.sub }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user)
                return done(null, user);
            else
                return done(null, false);
        });
    }));
    /**
     * Authentication with email and password
     */
    passport.use("local", new passport_local_1.Strategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, (_req, email, password, done) => {
        User_1.User.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(undefined, false);
            user.comparePassword(password, (err, isMatch) => {
                if (err)
                    return done(user);
                if (isMatch)
                    return done(undefined, user);
                return done(undefined, false);
            });
        });
    }));
}
exports.passportConfig = passportConfig;
