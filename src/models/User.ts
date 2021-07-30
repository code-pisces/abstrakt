import { Schema, model, Document, ObjectId, Error } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

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

type comparePasswordFunction = (candidatePassword: string, callback: (err: any, isMatch: any) => void) => void;

/**
 * Schema Users
 */

const UserSchema = new Schema<UserDocument>({
    name: String,
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    google: String,
    googleToken: String
}, { 
    timestamps: true 
});

/**
 * Password hash middleware
 */

UserSchema.pre("save", function save(next){
    const user = this as UserDocument;

    if(!user.isModified("password"))
        return next();

    bcrypt.genSalt(10, (err, salt) => {
        if(err)
            return next(err);
        bcrypt.hash(user.password, salt, null, (err: Error, hash) => {
            if(err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword: string, callback:(err: any, isMatch: any) => void): void {
    bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
        callback(err, isMatch);
    });
};

export const User = model<UserDocument>("User", UserSchema);