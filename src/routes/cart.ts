import { Router } from "express";

import { addItemToCart, getUserCart } from "../controllers/cart";
import { authenticateUserToken } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/", authenticateUserToken, getUserCart);
router.post("/", authenticateUserToken, addItemToCart);

export default router;
