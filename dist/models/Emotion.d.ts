import { Document, Types } from 'mongoose';
export interface EmotionDocument extends Document {
    id: string;
    _id: Types.ObjectId;
    user: Types.ObjectId;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Emotion: import("mongoose").Model<EmotionDocument, {}, {}>;
