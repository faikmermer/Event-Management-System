import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { generatedToken } from "../middleware/auth";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, role } = req.body;

  const exitingUser = await User.findOne({ email: email });

  if (exitingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
    });

    if (user) {
      await user.save();
      res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(500).json({ error: "Invalid user Data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
