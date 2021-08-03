import { Document, ObjectId } from 'mongoose';
export interface UserDocument extends Document {
    _id: ObjectId;
    id: string;
    name: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    google: string;
    googleToken: string;
    comparePassword: comparePasswordFunction;
    createdAt: Date;
    updatedAt: Date;
}
declare type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => void) => void;
export declare const User: import("mongoose").Model<UserDocument, {}, {}>;
export {};
