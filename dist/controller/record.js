"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.putRecord = exports.postRecord = exports.getRecordFromId = exports.getRecords = void 0;
const express_validator_1 = require("express-validator");
const Record_1 = require("../models/Record");
/**
 * Get all records from user by limit 20
 * @param page Number of page, must be int. Optional
 * @param limit Maximum number of records returned. Optional
 * @param sort Elements order, must be "asc" or "desc". Optional
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @param populate Populate emotions inside arrays, must be boolean. Optional
 * @route GET /api/records
 */
const getRecords = async (req, res, next) => {
    await express_validator_1.check("page", "page_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await express_validator_1.check("limit", "limit_invalid").optional({ nullable: true }).bail().escape().isNumeric().run(req);
    await express_validator_1.check("sort", "sort_invalid").optional({ nullable: true }).escape().run(req);
    await express_validator_1.check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    await express_validator_1.check("populate", "populate_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const limit = Number(req.query.limit) || 20;
    const page = Number(req.query.page) - 1;
    const sort = (req.query.sort === "asc" || req.query.sort === "desc") ? String(req.query.sort) : "desc";
    const timestamps = (req.query.timestamps == "true") ? "" : "-createdAt -updatedAt";
    const populate = (req.query.populate == "true") ? "thought_emotions.emotion answer_emotions.emotion" : "";
    Record_1.Record.find({ user: req.user._id })
        .limit(limit)
        .skip(page * limit)
        .select("-user -__v " + timestamps)
        .sort({ "createdAt": sort })
        .populate(populate, "_id name")
        .lean()
        .exec((err, records) => {
        if (err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err.message });
        next({ status: 200, data: records });
    });
};
exports.getRecords = getRecords;
/**
 * Get an record with specific id
 * @param id ID of record, must be string like ObjectId. Required
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @param populate Populate emotions inside arrays, must be boolean. Optional
 * @route GET /api/record/:id
 */
const getRecordFromId = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").escape().notEmpty().bail().isString().run(req);
    await express_validator_1.check("timestamps", "timestamps_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    await express_validator_1.check("populate", "populate_invalid").optional({ nullable: true }).escape().isBoolean().escape().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const timestamps = (req.query.timestamps == "true") ? "" : "-createdAt -updatedAt";
    const populate = (req.query.populate == "true") ? "thought_emotions.emotion answer_emotions.emotion" : "";
    Record_1.Record.findOne({ _id: req.params.id, user: req.user._id })
        .select("-user -__v " + timestamps)
        .populate(populate, "_id name")
        .exec((err, record) => {
        if (err)
            return next({ status: 400, messageType: "entry_not_found", errorMessage: err.message });
        if (record)
            return next({ status: 200, data: record });
        next({ status: 400, messageType: "entry_not_found" });
    });
};
exports.getRecordFromId = getRecordFromId;
/**
 * Create new record
 * @param date Date it happened, must be date. Required
 * @param thought Thought, must be string. Required
 * @param thought_believe How much does the thought make sense, must be number [0-100]. Required
 * @param thought_emotions Emotions caused by thought, must be array. Required
 * @param answer Rational response to thought, must be string. Required
 * @param answer_believe Emotions caused by answer, must be number [0-100]. Required
 * @param answer_emotions Emotions caused by rational response, must be array. Required
 * @param action Action to be taken, must be array. Required
 * @route POST /api/records
 */
const postRecord = async (req, res, next) => {
    await express_validator_1.check("date", "date_invalid").notEmpty().escape().matches(/\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/, "i").isBefore().withMessage("date must be in the past").run(req);
    await express_validator_1.check("thought", "thought_invalid").notEmpty().isString().run(req);
    await express_validator_1.check("thought_believe", "thought_believe_invalid").notEmpty().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("thought_emotions", "thought_emotions_invalid").notEmpty().isArray().run(req);
    await express_validator_1.check("thought_emotions.*.emotion", "thought_emotions_invalid").notEmpty().exists().isString().run(req);
    await express_validator_1.check("thought_emotions.*.feel", "thought_emotions_invalid").notEmpty().exists().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("answer", "answer_invalid").notEmpty().isString().run(req);
    await express_validator_1.check("answer_believe", "answer_believe_invalid").notEmpty().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("answer_emotions", "answer_emotions_invalid").notEmpty().isArray().run(req);
    await express_validator_1.check("answer_emotions.*.emotion", "answer_emotions_invalid").notEmpty().exists().isString().run(req);
    await express_validator_1.check("answer_emotions.*.feel", "answer_emotions_invalid").notEmpty().exists().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("action", "action_invalid").notEmpty().isString().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const record = new Record_1.Record({
        user: req.user._id,
        date: new Date(req.body.date),
        thought: req.body.thought,
        thought_believe: req.body.thought_believe,
        thought_emotions: req.body.thought_emotions,
        answer: req.body.answer,
        answer_believe: req.body.answer_believe,
        answer_emotions: req.body.answer_emotions,
        action: req.body.action
    });
    record.save((err, recordCreated) => {
        if (err)
            return next({ status: 400, messageType: "default_error", errorMessage: err.message });
        next({ status: 201, messageType: "record_success_create", data: recordCreated });
    });
};
exports.postRecord = postRecord;
/**
 * Put record, for update data.
 * @param id ID of record to update, must be ObjectID. Required
 * @param date Date it happened, must be date. Optional
 * @param thought Thought, must be string. Optional
 * @param thought_believe How much does the thought make sense, must be number [0-100]. Optional
 * @param thought_emotions Emotions caused by thought, must be array. Optional
 * @param answer Rational response to thought, must be string. Optional
 * @param answer_believe Emotions caused by answer, must be number [0-100]. Optional
 * @param answer_emotions Emotions caused by rational response, must be array. Optional
 * @param action Action to be taken, must be array. Optional
 * @route PUT /api/records
 */
const putRecord = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").notEmpty().isString().run(req);
    await express_validator_1.check("date", "date_invalid").optional({ nullable: true }).notEmpty().escape().matches(/\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/, "i").isBefore().withMessage("date must be in the past").run(req);
    await express_validator_1.check("thought", "thought_invalid").optional({ nullable: true }).notEmpty().isString().run(req);
    await express_validator_1.check("thought_believe", "thought_believe_invalid").optional({ nullable: true }).notEmpty().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("thought_emotions", "thought_emotions_invalid").optional({ nullable: true }).notEmpty().isArray().run(req);
    await express_validator_1.check("thought_emotions.*.emotion", "thought_emotions_invalid").optional({ nullable: true }).notEmpty().exists().isString().run(req);
    await express_validator_1.check("thought_emotions.*.feel", "thought_emotions_invalid").optional({ nullable: true }).notEmpty().exists().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("answer", "answer_invalid").optional({ nullable: true }).notEmpty().isString().run(req);
    await express_validator_1.check("answer_believe", "answer_believe_invalid").optional({ nullable: true }).notEmpty().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("answer_emotions", "answer_emotions_invalid").optional({ nullable: true }).notEmpty().isArray().run(req);
    await express_validator_1.check("answer_emotions.*.emotion", "answer_emotions_invalid").optional({ nullable: true }).notEmpty().exists().isString().run(req);
    await express_validator_1.check("answer_emotions.*.feel", "answer_emotions_invalid").optional({ nullable: true }).notEmpty().exists().isInt({ min: 0, max: 100 }).run(req);
    await express_validator_1.check("action", "action_invalid").optional({ nullable: true }).notEmpty().isString().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    Record_1.Record.findOne({ _id: req.params.id, user: req.user.id }, (err, record) => {
        if (err)
            return next({ status: 400, message: "default_error", errorMessage: err.message });
        if (!record)
            return next({ status: 400, message: "entry_not_found" });
        if (req.body.date)
            record.date = new Date(req.body.date);
        if (req.body.thought)
            record.thought = req.body.thought;
        if (req.body.thought_believe)
            record.thought_believe = req.body.thought_believe;
        if (req.body.thought_emotions)
            record.thought_emotions = req.body.thought_emotions;
        if (req.body.answer)
            record.answer = req.body.answer;
        if (req.body.answer_believe)
            record.answer_believe = req.body.answer_believe;
        if (req.body.answer_emotions)
            record.answer_emotions = req.body.answer_emotions;
        if (req.body.action)
            record.action = req.body.action;
        record.save({ validateModifiedOnly: true }, (err, recordUpdated) => {
            if (err)
                return next({ status: 400, message: "default_error", errorMessage: err.message });
            return next({ status: 200, data: recordUpdated, messageType: "record_success_update" });
        });
    });
};
exports.putRecord = putRecord;
/**
 * Delete record.
 * @param id Id of record for delete. Required
 * @route DELETE /api/records/:id
 */
const deleteRecord = async (req, res, next) => {
    await express_validator_1.check("id", "id_required").notEmpty().bail().isString().run(req);
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty())
        return next({ errors });
    const id = req.params.id;
    Record_1.Record.findOneAndDelete({ _id: id, user: req.user.id }).exec((err) => {
        if (err)
            return next({ status: 400, message: "default_error", errorMessage: err.message });
        next({ status: 200, messageType: "record_success_delete" });
    });
};
exports.deleteRecord = deleteRecord;
