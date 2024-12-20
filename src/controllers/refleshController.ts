import { Request, Response } from "express";
import { User } from "../models/user";
import { generatedToken } from "../middleware/auth";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const refreshToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  const decodedToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as jwt.JwtPayload;
  const user = await User.findById(decodedToken.userId);

  if (!user) return res.status(401).json({ error: "Invalid token" });

  const newToken = generatedToken(user.id.toString(), user.role);
  res.status(200).json({ token: newToken });
};
