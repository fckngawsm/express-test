"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const users_1 = __importDefault(require("./users"));
const goods_1 = __importDefault(require("./goods"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/users", users_1.default);
routes.use("/goods", goods_1.default);
