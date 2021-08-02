import { Request, Response, NextFunction } from "express";
/**
 * Signup local using email and password
 * @param name Name of the user, must be string. Optional.
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/signup
 */
export declare const postLocalSignup: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Login local using email and password
 * @param email Email of the user, must be string like email. Required
 * @param password Password of the user, must be string like password. Required
 * @route POST /auth/local/login
 */
export declare const postLocalLogin: (req: Request, res: Response, next: NextFunction) => any;
export declare const postLocalLoginOnError: (err: any, req: Request, res: Response, next: NextFunction) => any;
/**
 * Google OAuth
 * @param token Token obtained through google login
 * @route /auth/google
 */
export declare const postGoogleAuth: (req: Request, res: Response, next: NextFunction) => any;
