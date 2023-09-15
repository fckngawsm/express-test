import { NextFunction, Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User";

export const getAllUsers: RequestHandler = (_, res, next) => {
  User.findAll({})
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

export const createUser: RequestHandler = (req, res, next) => {
  const { name, lastname, email, password, isAdmin } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        lastname,
        isAdmin,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.send({
        data: {
          email: user.email,
          name: user.name,
          about: user.lastname,
          isAdmin: user.isAdmin,
        },
      })
    )
    .catch((err) => {
      next(err);
    });
};

export const loginUser: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  return User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      console.log(user);
      if (user) {
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            return Promise.reject("неправильный пароль или логин");
          }
          res.send({
            data: {
              email: user.email,
              name: user.name,
              about: user.lastname,
              isAdmin: user.isAdmin,
            },
          });
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
