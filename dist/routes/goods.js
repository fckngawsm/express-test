"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prdouct_1 = require("../controllers/prdouct");
const celebrate_1 = require("../utils/celebrate");
const router = (0, express_1.Router)();
router.get("/", prdouct_1.getAllGoods);
router.post("/", celebrate_1.celebrateCreateProduct, prdouct_1.createGoods);
router.delete("/:id", prdouct_1.deleteProductById); // исправить логику
router.patch("/:id", celebrate_1.celebrateUpdateProduct, prdouct_1.updateProductById);
exports.default = router;
