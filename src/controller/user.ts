import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";
import { check, validationResult } from 'express-validator';
import { TokenPayload } from 'google-auth-library';
import { CallbackError, NativeError } from "mongoose";

import { User, UserDocument } from '../models/User';

/**
 * Functions to generate Json Web Token
 * @param payload Object containing the user's name and email
 * @param sub String containing the id of user
 * @return Returns an access token that must be stored by the client for future requests
 */

const jwtGenerateToken = (payload: Object, sub: string): string | null => {
    try{
        const token: string = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
            expiresIn: "14 days",
            subject: sub
        });
        return token;
    }catch(err){
        console.error("Error on create jwt token: ", err);
        return null;
    }
}

/**
 * Function to create user
 * @param user User model already prepared
 */

const createNewUser = (user: UserDocument, next: NextFunction): any => {
    User.findOne({ email: user.email }, (err: NativeError, existingUser: UserDocument) => {
        if(err)
            return next({ status: 400, messageType: "default_error", errorMessage: err!.message });

        if(existingUser)
            return next({ status: 400, messageType: "user_already_exists" });
            
        user.save((err, userCreated) => {
            if(err)
                return next({ status: 400, messageType: "default_error", errorMessage: err!.message });
    
            const accessToken = jwtGenerateToken({ name: userCreated.name, email: userCreated.email }, userCreated.id);

            next({ status: 201, messageType: "user_success_create", data: { accessToken } });
        });
    });
}

/**
 * Signup local using email and password
 * @param name Name of the user, must be string. Optional.
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/signup
 */

export const postLocalSignup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log(req.body)
    await check("email", "email_invalid").escape().notEmpty().isEmail().run(req);
    await check("password", "password_invalid").escape().notEmpty().isString().isLength({ min: 6 }).run(req);
    await check("name", "name_invalid").optional({nullable: true}).isAlpha("pt-BR", {ignore: " -"}).run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    createNewUser(user, next);
}

/**
 * Login local using email and password
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/login
 */

export const postLocalLogin = (req: Request, res: Response, next: NextFunction): any => {
    const { user } = req;

    if(!user)
        return next({ status: 400, messageType: "user_local_invalid"});
    
    const accessToken = jwtGenerateToken({ name: user.name , email: user.email }, user.id);

    if(accessToken)
        return next({ status: 200, data: { accessToken }});

    next({ status: 400, messageType: "default_error"});
}

export const postLocalLoginOnError = (err: any, req: Request, res: Response, next: NextFunction): any => {
    next({ status: 400, messageType: "user_local_invalid", errorMessage: err});
}

/**
 * Google OAuth
 * @param token Token obtained through google login
 * @route /auth/google
 */

export const postGoogleAuth = (req: Request, res: Response, next: NextFunction): any => {
    const payload: TokenPayload | null = res.locals["google_payload"];
    const token: string | null = res.locals["google_token"];

    if(!payload || !token)
        return res.sendStatus(401);
    
    const { sub, email, name } = payload;

    User.findOne({ google: sub }, (err: CallbackError, existingUser: UserDocument | null) => {
        if(existingUser){
            const accessToken = jwtGenerateToken({ name: existingUser.name, email: existingUser.email }, existingUser.id);
            
            if(accessToken)
                return res.status(200).json({ accessToken });
            return res.status(400);
        }

        const user = new User({
            name: name,
            email: email,
            google: sub,
            googleToken: token
        });

        createNewUser(user, next);
    });
};