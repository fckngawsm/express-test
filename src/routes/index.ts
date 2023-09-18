import userRoutes from "./users";
import goodsRoutes from "./goods";
import cartRoutes from "./cart";
import { Router } from "express";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

// router.use("/", authenticateUserToken);
router.use("/cart", cartRoutes);
router.use("/users", userRoutes);
router.use("/goods", goodsRoutes);

export { router };
