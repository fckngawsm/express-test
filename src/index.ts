import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { router } from "./routes";
import { handleSendError } from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";
import cors from "cors";
import { User } from "./models/User";
import { Goods } from "./models/Goods";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/Cart-item";

dotenv.config();
// понять куда лучше вынести
declare global {
  namespace Express {
    interface Request {
      user: User;
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

app.use("/", router);

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
