import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { BadRequestError } from "../utils/bad-request-err";

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
          lastname: user.lastname,
          isAdmin: user.isAdmin,
        },
      })
    )
    .catch((err) => {
      next(err);
    });
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
        { id: user.id, email: user.email, name: user.name },
        "secret-key"
      );
      res.json({ token });
    } else {
      throw new BadRequestError("Проверьте введенные данные");
    }
  } else {
    next();
  }
};

// interface IGetUserAuthInfoRequest extends Request {
//   user: {
//     id: number;
//     email: string;
//     name: string;
//   };
// }

// export const getCurrentUser = (
//   req: IGetUserAuthInfoRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { id } = req.user;
//   User.findByPk(id).then((user) => {
//     console.log(user);
//   });
// };
