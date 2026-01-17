import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET all users except logged-in user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
