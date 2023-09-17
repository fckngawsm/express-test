"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const Goods_1 = require("../models/Goods");
const Cart_1 = require("../models/Cart");
const Cart_item_1 = require("../models/Cart-item");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "password",
    database: "express",
    logging: false,
    models: [User_1.User, Goods_1.Goods, Cart_1.Cart, Cart_item_1.CartItem],
});
exports.default = connection;
