import userRoutes from "./users";
import goodsRoutes from "./goods";
import { Router } from "express";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/goods", goodsRoutes);

export { routes };
