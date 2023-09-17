"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get("/", users_1.getAllUsers);
router.get("/me", users_1.getCurrentUser);
exports.default = router;
