"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const users_1 = __importDefault(require("./users"));
const goods_1 = __importDefault(require("./goods"));
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/", auth_1.authenticateUserToken);
router.use("/users", users_1.default);
router.use("/goods", goods_1.default);
