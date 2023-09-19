import { Router } from "express";

import { addItemToOrder } from "../controllers/order";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, addItemToOrder);

export default router;
