import { Router } from "express";

import {
  createGoods,
  deleteProductById,
  getAllGoods,
} from "../controllers/goods";

const router = Router();

router.get("/", getAllGoods);
router.post("/", createGoods);
router.delete("/:id", deleteProductById);

export default router;
