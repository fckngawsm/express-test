import { Router } from "express";

import { createGoods, getAllGoods } from "../controllers/goods";

const router = Router();

router.get("/", getAllGoods);
router.post("/", createGoods);

export default router;
