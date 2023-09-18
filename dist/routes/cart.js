"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.authenticateUserToken, cart_1.getUserCart);
router.post("/", auth_1.authenticateUserToken, cart_1.addItemToCart);
exports.default = router;
