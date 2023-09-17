import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Goods } from "../models/Goods";
import { Cart } from "../models/Cart";
import { CartItem } from "../models/Cart-item";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "express",
  logging: false,
  models: [User, Goods , Cart , CartItem],
});

export default connection;
