import { Request, Response, NextFunction } from "express";
/**
 * Firing when routes with no implemented features are accessed
 * @route ANY /*
 */
export declare const notFound: (_req: Request, _res: Response, next: NextFunction) => any;
