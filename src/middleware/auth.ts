import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { User } from "../models/user";

import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET as string;

export interface IReq extends Request {
  user?: any;
}

export const generatedToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, secretKey, {
    expiresIn: "1h",
  });
};
export const authen = async (
  req: IReq,
  res: Response,
  next: any
): Promise<any> => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey) as jwt.JwtPayload;
    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ error: "Invalid user-id token" });
    }
    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token!" });
  }
};

export const author = (role: string) => {
  return (req: IReq, res: Response, next: any) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ error: "Forbidden" });
    }
    return next();
  };
};
