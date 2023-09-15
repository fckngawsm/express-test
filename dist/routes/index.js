"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const users_1 = __importDefault(require("../routes/users"));
const users_2 = __importDefault(require("../routes/users"));
exports.router = users_2.default;
users_2.default.use("/users", users_1.default);
