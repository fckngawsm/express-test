import { Router } from "express";

import { getAllUsers, getCurrentUser } from "../controllers/users";
import { authenticateUserToken } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.get("/", authenticateUserToken, isAdmin, getAllUsers);
router.get("/me", authenticateUserToken, getCurrentUser);

export default router;
