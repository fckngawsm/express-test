import { Router } from "express";

import { getAllUsers } from "../controllers/users";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", authenticateUserToken, getAllUsers);
// router.get("/me", getCurrentUser);

export default router;
