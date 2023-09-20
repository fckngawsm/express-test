import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { ForbiddenError } from "../utils/forbidden-err";
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user || !user.isAdmin) {
    return next(new ForbiddenError("У вас нет прав"));
  }
  return next();
};
