import express, { Express } from "express";
import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import connection from "./config/db-config";
import { router } from "./routes";
import { handleSendError } from "./middlewares/sendError";
import { createUser, loginUser } from "./controllers/users";
import cors from "cors";
import { User } from "./models/User";
import { Product } from "./models/Product";
import { Cart } from "./models/Cart";
import { CartItem } from "./models/Cart-item";
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

app.post("/signin", loginUser);
app.post("/signup", createUser);

app.use("/", router);

User.hasOne(Cart);
Cart.belongsTo(User);

Product.belongsToMany(Cart, {
  through: CartItem,
});
Cart.belongsToMany(Product, {
  through: CartItem,
});
// Cart.belongsToMany(Goods, {
//   through: CartItem,
//   foreignKey: "id",
// });

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
