import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";
import { Goods } from "../models/Goods";

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "password",
  database: "express",
  logging: false,
  models: [User, Goods],
});

export default connection;
