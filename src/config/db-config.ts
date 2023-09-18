import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";
import { Order } from "../models/Order";
import { OrderItem } from "../models/Order-item";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "express",
  logging: false,
  models: [User, Product, Cart, CartItem, Order, OrderItem],
});

export default connection;
