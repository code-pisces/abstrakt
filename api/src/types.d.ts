import { User } from 'express';
import { UserDocument } from './models/User';

declare module "express"{
    export interface Request{
        user?: UserDocument & User
    }
}