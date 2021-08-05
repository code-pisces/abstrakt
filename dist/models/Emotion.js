"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emotion = void 0;
const mongoose_1 = require("mongoose");
const mongoose_encryption_1 = __importDefault(require("mongoose-encryption"));
const encKey = process.env.SECRET_KEY;
/**
 * Schema Emotions
 */
const EmotionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
});
EmotionSchema.plugin(mongoose_encryption_1.default, { secret: encKey });
exports.Emotion = mongoose_1.model("Emotion", EmotionSchema);
