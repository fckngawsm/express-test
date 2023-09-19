import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { router } from "./routes";
import handleError from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";
import cors from "cors";
import { User } from "./models/User";
import { Product } from "./models/Product";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/Cart-item";
import { Order } from "./models/Order";
import { OrderItem } from "./models/Order-item";
import { celebrateCreateUser, celebrateLoginUser } from "./utils/celebrate";
// import { CartItem } from "./models/Cart-item";

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

app.post("/signin", celebrateLoginUser, loginUser);
app.post("/signup", celebrateCreateUser, createUser);

app.use("/", router);

app.use(handleError);
User.hasOne(Cart);
User.hasMany(Order);

Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});

Product.belongsToMany(Cart, {
  through: CartItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

Order.belongsTo(User);
Order.belongsToMany(Product, {
  through: OrderItem,
});
connection
  .sync()
  .then(() => {
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
