import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { RequestCustom } from "../utils/Types/CustomRequest";

export const SECRET_KEY: Secret = "your-secret-key-here";

export const auth = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Oshibka");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    req.token = decoded;

    next();
  } catch (err) {
    res.status(401).send("Please authenticate");
  }
};
