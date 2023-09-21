"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
    }
}
exports.InternalServerError = InternalServerError;
