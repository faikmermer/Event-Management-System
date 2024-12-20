import { Request, Response } from "express";
import { Event } from "../models/event";

const nodemailer = require("nodemailer");

interface IReq extends Request {
  user?: any;
}
export const postEvent = async (req: IReq, res: Response): Promise<any> => {
  const { title, description, date, location, capacity } = req.body;
  if (!title || !description || !date || !location || !capacity) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  let remainingCapacity = capacity;
  try {
    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
      capacity,
      remainingCapacity,
    });

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const putEvent = async (req: Request, res: Response): Promise<any> => {
  const { title, description, date, location, capacity } = req.body;
  let remainingCapacity = 0;
  if (!title || !description || !date || !location || !capacity) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const eventFind = await Event.findOne({ _id: req.params.id });
    if (!eventFind) {
      return res.status(404).json({ error: "Event not found" });
    }

    eventFind.title = title;
    eventFind.description = description;
    eventFind.date = new Date(date);
    eventFind.location = location;
    eventFind.capacity = capacity;
    remainingCapacity = eventFind.capacity - eventFind.user.length;

    await eventFind.save();
    res
      .status(200)
      .json({ eventFind: eventFind.toObject(), remainingCapacity });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { deleteId } = req.params;
  try {
    const eventFind = await Event.findByIdAndDelete(deleteId);
    if (!eventFind) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const events = await Event.find({}).populate("user");
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEventsId = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const events = await Event.findById(req.params.id).populate("user");
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postEventIdRegister = async (
  req: IReq,
  res: Response
): Promise<any> => {
  try {
    const event: any = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.user.push(req.user.id);
    if (event.user.length === event.capacity) {
      return res.status(400).json({ error: "Event is full" });
    }

    await event.save();

    const userEmail = req.user.email;
    sendEmail({
      to: userEmail,
      subject: "Event Registration Successful",
      text: `You have successfully registered for the event.`,
    });
    res
      .status(200)
      .json({ message: "You have successfully registered for the event" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const deleteEventIdUnregister = async (
  req: IReq,
  res: Response
): Promise<any> => {
  try {
    const event: any = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    event.user.pull(req.user.id);

    await event.save();
    const userEmail = req.user.email;
    sendEmail({
      to: userEmail,
      subject: "Event Unregistration Successful",
      text: `You have successfully unregistered from the event.`,
    });
    res
      .status(200)
      .json({ message: "You have successfully unregistered from the event " });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const getEventIdAttendees = async (
  req: IReq,
  res: Response
): Promise<any> => {
  try {
    const event: any = await Event.findById(req.params.id).populate("user");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(
      event.user.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }))
    );
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const sendEmail = async ({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) => {
  const transporter = nodemailer.createTransport({
    secure: true,
    port: 465,
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER as string,
    to,
    subject,
    text,
  });
};
