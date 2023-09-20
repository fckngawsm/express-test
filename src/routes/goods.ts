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
} from "../utils/celebrate";

const router = Router();

router.post("/", celebrateCreateProduct, createGoods);
router.patch("/:id", updateProductById);
router.get("/", getAllGoods);
router.delete("/:id", deleteProductById); // исправить логику

export default router;
