import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { generatedToken } from "../middleware/auth";

const secretKey = process.env.JWT_SECRET as string;

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = await generatedToken(user.id.toString(), user.role);
    const refreshTok = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "7d",
    });
    user.refreshToken = refreshTok;
    await user.save();
    res.status(200).json({ token: token, refreshToken: refreshTok });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
