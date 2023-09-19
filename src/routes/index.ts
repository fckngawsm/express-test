import userRoutes from "./users";
import goodsRoutes from "./goods";
import cartRoutes from "./cart";
import orderRoutes from "./order";
import { Router } from "express";

const router = Router();

// router.use("/", authenticateUserToken);
router.use("/cart", cartRoutes);
router.use("/users", userRoutes);
router.use("/goods", goodsRoutes);
router.use("/order", orderRoutes);

export { router };
