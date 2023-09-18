import { Router } from "express";

import { addItemToCart } from "../controllers/cart";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, addItemToCart);

export default router;
