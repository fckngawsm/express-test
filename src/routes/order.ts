import { Router } from "express";

import {
  addItemToOrder,
  getAllOrders,
  getOrderByUserId,
} from "../controllers/order";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post("/", authenticateUserToken, addItemToOrder);
router.get("/", getAllOrders);
router.get("/current", authenticateUserToken, getOrderByUserId);
export default router;
