import { Request, Response, NextFunction } from 'express';
/**
 * Get all emotions from user by limit 20
 * @param page Number of page, must be int. Optional
 * @param limit Maximum number of records returned. Optional
 * @param sort Elements order, must be "asc" or "desc". Optional
 * @param timestamps Allows timestamps, must be boolean. Optional
 * @route GET /api/emotions
 */
export declare const getEmotions: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Get an emotion with specific id
 * @param id ID of emotion, must be string like ObjectId. Required
 * @param timestamps Allows timestamps, must be boolean. Optional
 */
export declare const getEmotionFromId: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Create new emotion
 * @param name Name of emotion, must be string. Required
 * @route POST /api/emotions
 */
export declare const postEmotion: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Put emotion, for update data.
 * @param id ID of emotion for update. Required
 * @param name Name of emotion, must be string. Optional
 * @route PUT /api/emotions
 */
export declare const putEmotion: (req: Request, res: Response, next: NextFunction) => Promise<any>;
/**
 * Delete emotion.
 * @param id ID of emotion for delete. Required
 * @route DELETE /api/emotions
 */
export declare const deleteEmotion: (req: Request, res: Response, next: NextFunction) => Promise<any>;
