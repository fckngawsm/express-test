import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { routes } from "./routes";
import { handleSendError } from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;
const app: Express = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.post("/signup", createUser);
app.post("/signin", loginUser);

app.use("/", routes);

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
