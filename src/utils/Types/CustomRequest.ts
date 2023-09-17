import { Request } from "express";
import { User } from "../../models/User";
import { JwtPayload } from "jsonwebtoken";

export interface RequestCustom extends Request {
  token: string | JwtPayload;
}
