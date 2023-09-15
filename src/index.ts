import express, { Express } from "express";
import dotenv from "dotenv";
import connection from "./config/db-config";
import { json, urlencoded } from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(json());

app.use(urlencoded({ extended: true }));

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

// вынести в переменную
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
