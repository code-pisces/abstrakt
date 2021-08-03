import { CallbackError, NativeError } from "mongoose";
import { PassportStatic } from "passport";
import { Strategy as JWTStrategy, ExtractJwt, StrategyOptions} from "passport-jwt";
import { Strategy as LocalStrategy } from 'passport-local';

import { User, UserDocument } from "../models/User";

function passportConfig(passport: PassportStatic){
    /**
     * JWT authentication middleware
     */
    var options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: process.env.TOKEN_SECRET as string,
    };

    passport.use("jwt", new JWTStrategy(options, (jwtPayload, done) => {
        User.findOne({_id: jwtPayload.sub}, (err: CallbackError, user: UserDocument | null) => {
            if(err){
                return done(err, false)}
            if(user)
                return done(null, user);
            else
                return done(null, false);
        });
    }));

    /**
     * Authentication with email and password
     */

    passport.use("local", new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true }, (_req, email, password, done) => {
        User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: UserDocument) => {
            if(err)
                return done(err);
            if(!user)
                return done(undefined, false);

            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if(err)
                    return done(user);
                if(isMatch)
                    return done(undefined, user)
                return done(undefined, false);
            })
        });
    }));
}

export { passportConfig };