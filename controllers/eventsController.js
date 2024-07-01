import mongoose from "mongoose";
import Event from "../models/EventModel.js";
import User from "../models/UserModel.js";


const getEvents = async (req, res) => {
  try {
   
    const events = await Event.find().sort({ createdAt: "desc" });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserEvents = async (req, res) => {
 
  const user = await User.findById(req.user._id);

  try {
 
    const userEvents = await Event.find({ user: user._id }).sort({ createdAt: "desc" });
    res.status(200).json({ userEvents, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const addEvent = async (req, res) => {
 
  const { name, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

 
  const user = await User.findById(req.user._id);

  try {
   
    const event = await Event.create({ user: user._id, name, date });

    res.status(200).json({ success: "Event created.", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
 
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }


  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  
  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await event.deleteOne();
    res.status(200).json({ success: "Event was deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateEvent = async (req, res) => {

  const { name, date } = req.body;

  
  if (!name || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Incorrect ID" });
  }


  const event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(400).json({ error: "Event not found" });
  }

  const user = await User.findById(req.user._id);
  if (!event.user.equals(user._id)) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await event.updateOne({ name, date });

    res.status(200).json({ success: "Event was updated." }, event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getEvents, getUserEvents, addEvent, deleteEvent, updateEvent };
