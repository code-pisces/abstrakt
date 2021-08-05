import { Schema, model, Document, Types } from "mongoose";
import encrypt from 'mongoose-encryption';

const encKey = process.env.SECRET_KEY

export interface RecordDocument extends Document {
    id: string;
    _id: Types.ObjectId;

    user: Types.ObjectId;

    date: Date;

    thought: string;
    thought_believe: Number;
    thought_emotions: Array<IEmotions>;

    answer: string;
    answer_believe: Number;
    answer_emotions: Array<IEmotions>;

    action: string;

    createdAt: Date;
    updatedAt: Date;
}

interface IEmotions {
    id_emotion: Types.ObjectId;
    feel: Number
}

/**
 * Schema Records
 */

const EmotionSubSchema = new Schema<IEmotions>({
    emotion: { 
        type: Schema.Types.ObjectId, 
        ref: "Emotion",
        required: true
    }, 
    feel: { 
        type: Number, 
        min: 0, 
        max: 100,
        required: true
    }
},{
    timestamps: false,
    _id: false
})

const RecordSchema = new Schema<RecordDocument>({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    date: { type: Date, required: true },

    thought: { type: String, required: true },
    thought_believe: { type: Number, required: true, min: 0, max: 100 },
    thought_emotions: [ EmotionSubSchema ],

    answer: { type: String, required: true },
    answer_believe: { type: Number, required: true, min: 0, max: 100 },
    answer_emotions: [ EmotionSubSchema ],

    action: { type: String, required: true },
}, {
    timestamps: true
});

RecordSchema.plugin(encrypt, { secret: encKey });

export const Record = model<RecordDocument>("Record", RecordSchema);