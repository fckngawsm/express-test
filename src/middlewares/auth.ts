import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { RequestHandler } from "express";
import { UnauthorizedError } from "../utils/unauthorized-err";

export const SECRET_KEY: Secret = "secret-key";

export const auth: RequestHandler = (req:any, _, next) => {
  const { authorization } = req.headers;
  const bearer = "Bearer ";

  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError("Пользователя не существует"));
  }

  const token = authorization.replace(bearer, "");
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError("Пользователя не существует"));
  }

  req.user = payload;
  console.log(req.user)
  return next();
};
