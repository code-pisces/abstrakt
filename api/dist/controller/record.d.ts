import { Request, Response, NextFunction } from 'express';
/**
 * Get all records from user by limit 20
 * @param page Number of page, must be int. Optional
 * @param limit Maximum number of records returned. Optional
 * @param sort Elements order, must be "asc" or "desc". Optional
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @param populate Populate emotions inside arrays, must be boolean. Optional
 * @route GET /api/records
 */
export declare const getRecords: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Get an record with specific id
 * @param id ID of record, must be string like ObjectId. Required
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @param populate Populate emotions inside arrays, must be boolean. Optional
 * @route GET /api/record/:id
 */
export declare const getRecordFromId: (req: Request, res: Response, next: NextFunction) => Promise<any>;
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
export declare const postRecord: (req: Request, res: Response, next: NextFunction) => Promise<any>;
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
export declare const putRecord: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Delete record.
 * @param id Id of record for delete. Required
 * @route DELETE /api/records/:id
 */
export declare const deleteRecord: (req: Request, res: Response, next: NextFunction) => Promise<any>;
