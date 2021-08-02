import { Document, Types } from "mongoose";
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
    feel: Number;
}
export declare const Record: import("mongoose").Model<RecordDocument, {}, {}>;
export {};
