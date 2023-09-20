import jwt, { JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { UnauthorizedError } from "../utils/unauthorized-err";

export const authenticateUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string = req.headers["authorization"]!;
  const token: string = authHeader && authHeader.split(" ")[1];
  let payload;
  try {
    payload = jwt.verify(token, "secret-key");
  } catch (error) {
    return next(new UnauthorizedError("Ввойдите в аккаунт!!!"));
  }
  req.user = payload as User;
  console.log(req.user);
  return next();
};
