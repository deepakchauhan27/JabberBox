import express from "express";
import User from "../models/User.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all users except logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const users = await User.find(
      { _id: { $ne: req.user._id } },
      "-password"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
