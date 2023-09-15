import { NextFunction, Request, Response } from "express";

export const handleSendError = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? "Internal Server Error" : message });
  next();
};
