import { Router } from "express";

import {
  createGoods,
  deleteProductById,
  getAllGoods,
  updateProductById,
} from "../controllers/prdouct";

const router = Router();

router.get("/", getAllGoods);
router.post("/", createGoods);
router.delete("/:id", deleteProductById);
router.patch("/:id", updateProductById);

export default router;
