import { Router } from "express";

import {
  addItemToOrder,
  getAllOrders,
  getOrderByUserId,
} from "../controllers/order";
import { authenticateUserToken } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/", authenticateUserToken, addItemToOrder);
router.get("/", authenticateUserToken, isAdmin, getAllOrders);
router.get("/current", authenticateUserToken, getOrderByUserId);
export default router;
