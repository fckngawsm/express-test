import { NextFunction, Request, Response } from "express";
import { User } from "../models/User";
export const getAllUsers = (_: Request, res: Response, next: NextFunction) => {
  User.findAll({})
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
