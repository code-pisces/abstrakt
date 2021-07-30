import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import { CallbackError, LeanDocument } from 'mongoose';

import { Emotion, EmotionDocument } from '../models/Emotion';

/**
 * Get all emotions from user by limit 20
 * @param page Number of page, must be int. Optional
 * @param limit Maximum number of records returned. Optional
 * @param sort Elements order, must be "asc" or "desc". Optional
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @route GET /api/emotions
 */

export const getEmotions = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await check("page", "page_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await check("limit", "limit_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await check("sort", "sort_invalid").optional({ nullable: true }).escape().run(req);
    await check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });
    
    const limit: number = Number(req.query.limit) || 20;
    const page: number = Number(req.query.page) - 1;
    const sort: string = (req.query.sort === "asc" || req.query.sort === "desc") ? String(req.query.sort) : "desc";
    const timestamps: string = (req.query.timestamps == "true") ? "createdAt updatedAt" : "";

    Emotion.find({ user: req.user._id })
    .limit(limit)
    .skip(page * limit)
    .select("_id name " + timestamps)
    .sort({"createdAt": sort})
    .lean()
    .exec((err: CallbackError, emotions: LeanDocument<EmotionDocument>[]) => {
        if(err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err!.message });
        next({ status: 200, data: emotions });
    });
};

/**
 * Get an emotion with specific id
 * @param id ID of emotion, must be string like ObjectId. Required
 * @param timestamps Allows timestamps, must be boolean. Optional
 */

export const getEmotionFromId = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    await check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });
    
    const timestamps: string = (req.query.timestamps == "true") ? "createdAt updatedAt" : "";

    Emotion.findOne({_id: req.params.id, user: req.user._id})
    .select("_id name " + timestamps)
    .exec((err: CallbackError, emotion: EmotionDocument | null): any => {
        if(err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err!.message });
        if(emotion)
            return next({ status: 200, data: emotion });
        next({ status: 400, messageType: "entry_not_found" });
    });
};

/**
 * Create new emotion
 * @param name Name of emotion, must be string. Required
 * @route POST /api/emotions
 */

export const postEmotion = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await check("name", "name_invalid").escape().notEmpty().bail().isAlpha("pt-BR", {ignore: " -"}).run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });

    const emotion = new Emotion({
        user: req.user._id,
        name: req.body.name
    });

    Emotion.findOne({ user: req.user._id, name: req.body.name }, (err: CallbackError, existingEmotion: EmotionDocument | null) => {
        if(err)
            return next({ status: 400, messageType: "default_error" });
        
        if(existingEmotion)
            return next({ status: 400, messageType: "emotion_already_exists" });
        
        emotion.save((err: CallbackError, emotionCreated: EmotionDocument | null) => {
            if(err)
                return next({ status: 400, messageType: "default_error", errorMessage: err!.message });
            
            return next({ status: 201, data: emotionCreated, messageType: "emotion_success_create" });
        });
    });
};

/**
 * Put emotion, for update data.
 * @param id ID of emotion for update. Required
 * @param name Name of emotion, must be string. Optional
 * @route PUT /api/emotions
 */

export const putEmotion = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    await check("name", "name_invalid").escape().isAlpha("pt-BR", {ignore: " -"}).run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });
    
    Emotion.findOne({ _id: req.params.id, user: req.user.id }, (err: CallbackError, emotion: EmotionDocument): any => {
        if(err)
            return next({ status: 400, messageType: "default_error", errorMessage: err!.message });
        emotion.name = req.body.name || ""
        emotion.save((err: CallbackError): any => {
            if(err)
                return next({ status: 400, messageType: "default_error", errorMessage: err!.message });
            next({ status: 200, data: emotion,messageType: "emotion_success_update" });
        });
    });
};

/**
 * Delete emotion.
 * @param id ID of emotion for delete. Required
 * @route DELETE /api/emotions
 */

export const deleteEmotion = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    await check("id", "id_required").escape().notEmpty().bail().isString().run(req);

    const errors = validationResult(req);

    if(!errors.isEmpty())
        return next({ errors });

    const id: string = req.params.id;

    Emotion.findOneAndDelete({ _id: req.params.id, user: req.user.id }).exec((err: CallbackError): any => {
        if(err)
            return next({ status: 400, messageType: "default_error", errorMessage: err!.message });
        return next({ status: 200, messageType: "emotion_success_delete" });
    });
};