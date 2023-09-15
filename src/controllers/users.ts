import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = (_, res, next) => {
  User.findAll({})
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};
