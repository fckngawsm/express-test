import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { router } from "./routes";
import { handleSendError } from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(json());
app.use(urlencoded({ extended: true }));

app.post("/signup", createUser);
app.post("/signin", loginUser);

app.use("/", router);

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
