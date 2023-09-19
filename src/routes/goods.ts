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

router.get("/", getAllGoods);
router.post("/", celebrateCreateProduct, createGoods);
router.delete("/:id", deleteProductById); // исправить логику
router.patch("/:id", celebrateUpdateProduct, updateProductById);

export default router;
