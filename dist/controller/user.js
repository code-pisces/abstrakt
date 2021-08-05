"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postGoogleAuth = exports.postLocalLoginOnError = exports.postLocalLogin = exports.postLocalSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
/**
 * Functions to generate Json Web Token
 * @param payload Object containing the user's name and email
 * @param sub String containing the id of user
 * @return Returns an access token that must be stored by the client for future requests
 */
const jwtGenerateToken = (payload, sub) => {
    try {
        const token = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "14 days",
            subject: sub
        });
        return token;
    }
    catch (err) {
        console.error("Error on create jwt token: ", err);
        return null;
    }
};
/**
 * Function to create user
 * @param user User model already prepared
 */
const createNewUser = (user, next) => {
    User_1.User.findOne({ email: user.email }, (err, existingUser) => {
        if (err)
            return next({ status: 400, messageType: "default_error", errorMessage: err.message });
        if (existingUser)
            return next({ status: 400, messageType: "user_already_exists" });
        user.save((err, userCreated) => {
            if (err)
                return next({ status: 400, messageType: "default_error", errorMessage: err.message });
            const accessToken = jwtGenerateToken({ name: userCreated.name, email: userCreated.email }, userCreated.id);
            next({ status: 201, messageType: "user_success_create", data: { accessToken } });
        });
    });
};
/**
 * Signup local using email and password
 * @param name Name of the user, must be string. Optional.
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/signup
 */
const postLocalSignup = async (req, res, next) => {
    console.log(req.body);
    await express_validator_1.check("email", "email_invalid").escape().notEmpty().isEmail().run(req);
    await express_validator_1.check("password", "password_invalid").escape().notEmpty().isString().isLength({ min: 6 }).run(req);
    await express_validator_1.check("name", "name_invalid").optional({ nullable: true }).isAlpha("pt-BR", { ignore: " -" }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const user = new User_1.User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    createNewUser(user, next);
};
exports.postLocalSignup = postLocalSignup;
/**
 * Login local using email and password
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/login
 */
const postLocalLogin = (req, res, next) => {
    const { user } = req;
    if (!user)
        return next({ status: 400, messageType: "user_local_invalid" });
    const accessToken = jwtGenerateToken({ name: user.name, email: user.email }, user.id);
    if (accessToken)
        return next({ status: 200, data: { accessToken } });
    next({ status: 400, messageType: "default_error" });
};
exports.postLocalLogin = postLocalLogin;
const postLocalLoginOnError = (err, req, res, next) => {
    next({ status: 400, messageType: "user_local_invalid", errorMessage: err });
};
exports.postLocalLoginOnError = postLocalLoginOnError;
/**
 * Google OAuth
 * @param token Token obtained through google login
 * @route /auth/google
 */
const postGoogleAuth = (req, res, next) => {
    const payload = res.locals["google_payload"];
    const token = res.locals["google_token"];
    if (!payload || !token)
        return res.sendStatus(401);
    const { sub, email, name } = payload;
    User_1.User.findOne({ google: sub }, (err, existingUser) => {
        if (existingUser) {
            const accessToken = jwtGenerateToken({ name: existingUser.name, email: existingUser.email }, existingUser.id);
            if (accessToken)
                return res.status(200).json({ accessToken });
            return res.status(400);
        }
        const user = new User_1.User({
            name: name,
            email: email,
            google: sub,
            googleToken: token
        });
        createNewUser(user, next);
    });
};
exports.postGoogleAuth = postGoogleAuth;
