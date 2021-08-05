"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const mongoose_1 = require("mongoose");
const mongoose_encryption_1 = __importDefault(require("mongoose-encryption"));
const encKey = process.env.SECRET_KEY;
/**
 * Schema Records
 */
const EmotionSubSchema = new mongoose_1.Schema({
    emotion: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Emotion",
        required: true
    },
    feel: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    }
}, {
    timestamps: false,
    _id: false
});
const RecordSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, required: true },
    thought: { type: String, required: true },
    thought_believe: { type: Number, required: true, min: 0, max: 100 },
    thought_emotions: [EmotionSubSchema],
    answer: { type: String, required: true },
    answer_believe: { type: Number, required: true, min: 0, max: 100 },
    answer_emotions: [EmotionSubSchema],
    action: { type: String, required: true },
}, {
    timestamps: true
});
RecordSchema.plugin(mongoose_encryption_1.default, { secret: encKey });
exports.Record = mongoose_1.model("Record", RecordSchema);
