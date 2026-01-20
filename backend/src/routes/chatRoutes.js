import express from "express";
import { accessChat } from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/", protect, accessChat);

router.get("/", protect, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $in: [req.user._id] },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    console.error("GET /api/chats error:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
});

export default router;
