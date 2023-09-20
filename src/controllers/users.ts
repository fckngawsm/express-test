import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { BadRequestError } from "../utils/bad-request-err";
import { Cart } from "../models/Cart";
import { NotFoundError } from "../utils/not-found-err";

export const getAllUsers: RequestHandler = (_, res, next) => {
  User.findAll({})
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

export const createUser: RequestHandler = async (req, res, next) => {
  const { name, lastname, email, password, isAdmin } = req.body;
  try {
    let hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      lastname,
      isAdmin,
      email,
      password: hashPassword,
    });
    await user.save();
    if (user) {
      await Cart.create({
        UserId: user.id,
      });
      res.json({
        message: "user fulfield created",
        userId: `user id ${user.id}`,
      });
    } else {
      // throw new BadRequestError("Проверьте введенные данные");
      return next(new BadRequestError("Проверьте введенные данные"));
    }
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    const matched = await bcrypt.compare(password, user.password);
    if (matched) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
        },
        "secret-key"
      );
      const { password, ...userData } = user.dataValues;
      res.send({ token, ...userData });
    } else {
      return next(new NotFoundError("Проверьте пароль"));
    }
  }
  return next(new NotFoundError("Проверьте введенные данные"));
};

export const getCurrentUser: RequestHandler = (req, res, next) => {
  const { id } = req.user;
  User.findByPk(id)
    .then((user) => {
      return res.json(user);
    })
    .catch((err) => {
      next(err);
    });
};
