import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import userRoutes from "./routes/users";
import { handleSendError } from "./middlewares/sendError";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/users", userRoutes);

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.use(handleSendError);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
