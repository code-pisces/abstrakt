"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt = __importStar(require("bcrypt"));
/**
 * Schema Users
 */
const UserSchema = new mongoose_1.Schema({
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
UserSchema.pre("save", async function save(next) {
    const user = this;
    if (!user.isModified("password"))
        return next();
    try {
        let salt = await bcrypt.genSalt(10);
        let passwordHashed = await bcrypt.hash(user.password, salt);
        user.password = passwordHashed;
        next();
    }
    catch (err) {
        next(err);
    }
});
UserSchema.methods.comparePassword = async function (candidatePassword, callback) {
    try {
        let result = await bcrypt.compare(candidatePassword, this.password);
        callback(null, result);
    }
    catch (err) {
        callback(err, null);
    }
};
exports.User = mongoose_1.model("User", UserSchema);
