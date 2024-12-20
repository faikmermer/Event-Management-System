import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  password: string;
  email: string;
  role: string;
  refreshToken: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  refreshToken: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>("User", UserSchema);
