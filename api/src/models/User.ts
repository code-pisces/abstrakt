import { Schema, model, Document, ObjectId, Error } from 'mongoose';
import * as bcrypt from 'bcrypt';

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

UserSchema.pre("save", async function save(next): Promise<any>{
    const user = this as UserDocument;

    if(!user.isModified("password"))
        return next();

    try{
        let salt = await bcrypt.genSalt(10);
        let passwordHashed = await bcrypt.hash(user.password, salt);
        user.password = passwordHashed;
        next();
    }catch(err){
        next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string, callback:(err: any, isMatch: any) => void): Promise<void> {
    try{
        let result = await bcrypt.compare(candidatePassword, this.password);
        callback(null, result);
    }catch(err){
        callback(err, null);
    }
};

export const User = model<UserDocument>("User", UserSchema);