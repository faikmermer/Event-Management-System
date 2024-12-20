import mongoose, { Schema } from "mongoose";
import { User } from "./user";
interface IEvent {
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  user: { type: Schema.Types.ObjectId; ref: "User" }[];
}

const EventSchema: Schema = new Schema<IEvent>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

export const Event = mongoose.model<IEvent>("Event", EventSchema);
