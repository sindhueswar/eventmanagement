import express from "express";
import {
  getEvents,
  getUserEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} from "../controllers/eventsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getEvents);

router.get("/user", auth, getUserEvents);


router.post("/", auth, addEvent);


router.delete("/:id", auth, deleteEvent);


router.put("/:id", auth, updateEvent);

export { router as eventsRoutes };
