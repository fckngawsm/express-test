"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const db_config_1 = __importDefault(require("./config/db-config"));
const routes_1 = require("./routes");
const sendError_1 = require("./middlewares/sendError");
const users_1 = require("./controllers/users");
const cors_1 = __importDefault(require("cors"));
const User_1 = require("./models/User");
const Product_1 = require("./models/Product");
const Cart_1 = require("./models/Cart");
const Cart_item_1 = require("./models/Cart-item");
// import { CartItem } from "./models/Cart-item";
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.post("/signin", users_1.loginUser);
app.post("/signup", users_1.createUser);
app.use("/", routes_1.router);
User_1.User.hasOne(Cart_1.Cart);
Cart_1.Cart.belongsTo(User_1.User);
Product_1.Product.belongsToMany(Cart_1.Cart, {
    through: Cart_item_1.CartItem,
});
Cart_1.Cart.belongsToMany(Product_1.Product, {
    through: Cart_item_1.CartItem,
});
// Order.belongsTo(User);
// Order.belongsToMany(Product, {
//   through: OrderItem,
// });
db_config_1.default
    .sync()
    .then(() => {
    console.log("Database successfully connected");
})
    .catch((err) => {
    console.log("Error", err);
});
app.use(sendError_1.handleSendError);
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
