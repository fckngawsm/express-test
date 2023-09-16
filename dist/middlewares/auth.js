"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unauthorized_err_1 = require("../utils/unauthorized-err");
exports.SECRET_KEY = "secret-key";
const auth = (req, _, next) => {
    const { authorization } = req.headers;
    const bearer = "Bearer ";
    if (!authorization || !authorization.startsWith(bearer)) {
        return next(new unauthorized_err_1.UnauthorizedError("Пользователя не существует"));
    }
    const token = authorization.replace(bearer, "");
    let payload;
    try {
        payload = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY);
    }
    catch (err) {
        return next(new unauthorized_err_1.UnauthorizedError("Пользователя не существует"));
    }
    req.user = payload;
    console.log(req.user);
    return next();
};
exports.auth = auth;
