import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { routes } from "./routes";
import { handleSendError } from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";
import cors from "cors";
import { User } from "./models/User";
import { Goods } from "./models/Goods";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/Cart-item";
import { JwtPayload } from "jsonwebtoken";

dotenv.config();
declare global {
  namespace Express {
    interface Request {
      token: JwtPayload | string;
    }
  }
}
const port = process.env.PORT;
const app: Express = express();
app.use(cors());

app.use(json());
app.use(urlencoded({ extended: true }));

app.post("/signup", createUser);
app.post("/signin", loginUser);

app.use("/", routes);

User.hasMany(Goods);
Goods.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
}); // ?
User.hasOne(Cart);
Cart.belongsToMany(Goods, {
  through: CartItem,
  foreignKey: "id",
});

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
