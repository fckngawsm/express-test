"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = require("../models/User");
const Product_1 = require("../models/Product");
const Cart_1 = require("../models/Cart");
const Cart_item_1 = require("../models/Cart-item");
const Order_1 = require("../models/Order");
const Order_item_1 = require("../models/Order-item");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: "password",
    database: "express",
    logging: false,
    models: [User_1.User, Product_1.Product, Cart_1.Cart, Cart_item_1.CartItem, Order_1.Order, Order_item_1.OrderItem],
});
exports.default = connection;
