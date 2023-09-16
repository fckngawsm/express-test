"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goods_1 = require("../controllers/goods");
const router = (0, express_1.Router)();
router.get("/", goods_1.getAllGoods);
router.post("/", goods_1.createGoods);
exports.default = router;
