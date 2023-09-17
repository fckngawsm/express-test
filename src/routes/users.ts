import { Router } from "express";

import { getAllUsers, getCurrentUser } from "../controllers/users";
import { authenticateUserToken } from "../middlewares/auth";

const router = Router();

router.get("/", getAllUsers);
router.get("/me", getCurrentUser);

export default router;
