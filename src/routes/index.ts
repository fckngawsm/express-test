import userRoutes from "../routes/users";
import router from "../routes/users";

router.use("/users", userRoutes);

export { router };
