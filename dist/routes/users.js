"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", users_1.getAllUsers);
router.get("/me", auth_1.authenticateUserToken, users_1.getCurrentUser);
exports.default = router;
