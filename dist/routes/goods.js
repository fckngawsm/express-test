"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prdouct_1 = require("../controllers/prdouct");
const celebrate_1 = require("../utils/celebrate/celebrate");
const isAdmin_1 = require("../middlewares/isAdmin");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticateUserToken, isAdmin_1.isAdmin, celebrate_1.celebrateCreateProduct, prdouct_1.createGoods);
router.get("/", prdouct_1.getAllGoods);
router.patch("/:id", auth_1.authenticateUserToken, isAdmin_1.isAdmin, prdouct_1.updateProductById);
router.delete("/:id", auth_1.authenticateUserToken, isAdmin_1.isAdmin, prdouct_1.deleteProductById);
exports.default = router;
