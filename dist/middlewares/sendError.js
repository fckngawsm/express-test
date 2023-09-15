"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendError = void 0;
const handleSendError = (err, _, res, next) => {
    const { statusCode = 500, message } = err;
    res
        .status(statusCode)
        .send({ message: statusCode === 500 ? "Internal Server Error" : message });
    next();
};
exports.handleSendError = handleSendError;
