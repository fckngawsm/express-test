import { Router } from "express";

import { addItemToOrder, getAllOrders } from "../controllers/order";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, addItemToOrder);
router.get("/", getAllOrders);
export default router;
