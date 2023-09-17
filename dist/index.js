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
const Goods_1 = require("./models/Goods");
const Cart_1 = require("./models/Cart");
const Cart_item_1 = require("./models/Cart-item");
dotenv_1.default.config();
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.post("/signup", users_1.createUser);
app.post("/signin", users_1.loginUser);
app.use("/", routes_1.router);
User_1.User.hasMany(Goods_1.Goods);
Goods_1.Goods.belongsTo(User_1.User, {
    constraints: true,
    onDelete: "CASCADE",
}); // ?
User_1.User.hasOne(Cart_1.Cart);
Cart_1.Cart.belongsToMany(Goods_1.Goods, {
    through: Cart_item_1.CartItem,
    foreignKey: "id",
});
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
