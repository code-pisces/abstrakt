import { Schema, model, Document, Types } from 'mongoose';

export interface EmotionDocument extends Document {
    id: string;
    _id: Types.ObjectId;

    user: Types.ObjectId;
    name: string;

    createdAt: Date;
    updatedAt: Date;
}

/**
 * Schema Emotions
 */

const EmotionSchema = new Schema<EmotionDocument>({
    user: { 
        type: Schema.Types.ObjectId, 
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

export const Emotion = model<EmotionDocument>("Emotion", EmotionSchema);