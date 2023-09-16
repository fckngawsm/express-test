import { Router } from "express";

import { getAllUsers } from "../controllers/users";
import { auth } from "../middlewares/auth";

const router = Router();

router.get("/", auth, getAllUsers);
// router.get("/me", getCurrentUser);

export default router;
