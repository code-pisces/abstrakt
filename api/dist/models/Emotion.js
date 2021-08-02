"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emotion = void 0;
const mongoose_1 = require("mongoose");
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
exports.Emotion = mongoose_1.model("Emotion", EmotionSchema);
