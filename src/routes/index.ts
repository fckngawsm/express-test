import userRoutes from "./users";
import goodsRoutes from "./goods";
const routes = require("express").Router();

routes.use("/users", userRoutes);
routes.use("/goods", goodsRoutes);

export { routes };
