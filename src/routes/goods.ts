import { Router } from "express";

import {
  createGoods,
  deleteProductById,
  getAllGoods,
  updateProductById,
} from "../controllers/prdouct";
import {
  celebrateCreateProduct,
  celebrateUpdateProduct,
} from "../utils/celebrate/celebrate";
import { isAdmin } from "../middlewares/isAdmin";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.post(
  "/",
  authenticateUserToken,
  isAdmin,
  celebrateCreateProduct,
  createGoods
);
router.get("/", getAllGoods);
router.patch("/:id", authenticateUserToken, isAdmin, updateProductById);
router.delete("/:id", authenticateUserToken, isAdmin, deleteProductById); // исправить логику

export default router;
