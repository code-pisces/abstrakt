"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
/**
 * Firing when routes with no implemented features are accessed
 * @route ANY /*
 */
const notFound = (_req, _res, next) => {
    next({
        status: 501,
        messageType: "not_implemented"
    });
};
exports.notFound = notFound;
