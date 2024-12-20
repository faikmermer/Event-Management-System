import express from "express";
import { register } from "../controllers/registerController";
import { login } from "../controllers/loginController";
import { refreshToken } from "../controllers/refleshController";
import {
  postEvent,
  putEvent,
  getEvents,
  postEventIdRegister,
  deleteEventIdUnregister,
  getEventIdAttendees,
} from "../controllers/eventController";
import { authen } from "../middleware/auth";
import { author } from "../middleware/auth";
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh", refreshToken);

router.post("/events", authen, author("admin"), postEvent);
router.put("/events/:id", authen, author("admin"), putEvent);
router.get("/events", authen, getEvents);

router.post("/events/:id/register", authen, postEventIdRegister);
router.delete("/events/:id/unregister", authen, deleteEventIdUnregister);
router.get(
  "/events/:id/attendees",
  authen,
  author("admin"),
  getEventIdAttendees
);

export default router;
