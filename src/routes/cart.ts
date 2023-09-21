import { Router } from "express";

import { addItemToCart, clearUserCart, getUserCart } from "../controllers/cart";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getUserCart);
router.post("/", authenticateUserToken, addItemToCart);
router.delete("/remove", authenticateUserToken, clearUserCart);

export default router;
