"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmotion = exports.putEmotion = exports.postEmotion = exports.getEmotionFromId = exports.getEmotions = void 0;
const express_validator_1 = require("express-validator");
const Emotion_1 = require("../models/Emotion");
/**
 * Get all emotions from user by limit 20
 * @param page Number of page, must be int. Optional
 * @param limit Maximum number of records returned. Optional
 * @param sort Elements order, must be "asc" or "desc". Optional
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @route GET /api/emotions
 */
const getEmotions = async (req, res, next) => {
    await express_validator_1.check("page", "page_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await express_validator_1.check("limit", "limit_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await express_validator_1.check("sort", "sort_invalid").optional({ nullable: true }).escape().run(req);
    await express_validator_1.check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) - 1;
    const sort = (req.query.sort === "asc" || req.query.sort === "desc") ? String(req.query.sort) : "desc";
    const timestamps = (req.query.timestamps == "true") ? "createdAt updatedAt" : "";
    Emotion_1.Emotion.find({ user: req.user._id })
        .limit(limit)
        .skip(page * limit)
        .select("_id name " + timestamps)
        .sort({ "createdAt": sort })
        .lean()
        .exec((err, emotions) => {
        if (err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err.message });
        next({ status: 200, data: emotions });
    });
};
exports.getEmotions = getEmotions;
/**
 * Get an emotion with specific id
 * @param id ID of emotion, must be string like ObjectId. Required
 * @param timestamps Allows timestamps, must be boolean. Optional
 */
const getEmotionFromId = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    await express_validator_1.check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const timestamps = (req.query.timestamps == "true") ? "createdAt updatedAt" : "";
    Emotion_1.Emotion.findOne({ _id: req.params.id, user: req.user._id })
        .select("_id name " + timestamps)
        .exec((err, emotion) => {
        if (err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err.message });
        if (emotion)
            return next({ status: 200, data: emotion });
        next({ status: 400, messageType: "entry_not_found" });
    });
};
exports.getEmotionFromId = getEmotionFromId;
/**
 * Create new emotion
 * @param name Name of emotion, must be string. Required
 * @route POST /api/emotions
 */
const postEmotion = async (req, res, next) => {
    await express_validator_1.check("name", "name_invalid").escape().notEmpty().bail().isAlpha("pt-BR", { ignore: " -" }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const emotion = new Emotion_1.Emotion({
        user: req.user._id,
        name: req.body.name
    });
    Emotion_1.Emotion.findOne({ user: req.user._id, name: req.body.name }, (err, existingEmotion) => {
        if (err)
            return next({ status: 400, messageType: "default_error" });
        if (existingEmotion)
            return next({ status: 400, messageType: "emotion_already_exists" });
        emotion.save((err, emotionCreated) => {
            if (err)
                return next({ status: 400, messageType: "default_error", errorMessage: err.message });
            return next({ status: 201, data: emotionCreated, messageType: "emotion_success_create" });
        });
    });
};
exports.postEmotion = postEmotion;
/**
 * Put emotion, for update data.
 * @param id ID of emotion for update. Required
 * @param name Name of emotion, must be string. Optional
 * @route PUT /api/emotions
 */
const putEmotion = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    await express_validator_1.check("name", "name_invalid").escape().isAlpha("pt-BR", { ignore: " -" }).run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    Emotion_1.Emotion.findOne({ _id: req.params.id, user: req.user.id }, (err, emotion) => {
        if (err)
            return next({ status: 400, messageType: "default_error", errorMessage: err.message });
        emotion.name = req.body.name || "";
        emotion.save((err) => {
            if (err)
                return next({ status: 400, messageType: "default_error", errorMessage: err.message });
            next({ status: 200, data: emotion, messageType: "emotion_success_update" });
        });
    });
};
exports.putEmotion = putEmotion;
/**
 * Delete emotion.
 * @param id ID of emotion for delete. Required
 * @route DELETE /api/emotions
 */
const deleteEmotion = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const id = req.params.id;
    Emotion_1.Emotion.findOneAndDelete({ _id: req.params.id, user: req.user.id }).exec((err) => {
        if (err)
            return next({ status: 400, messageType: "default_error", errorMessage: err.message });
        return next({ status: 200, messageType: "emotion_success_delete" });
    });
};
exports.deleteEmotion = deleteEmotion;
