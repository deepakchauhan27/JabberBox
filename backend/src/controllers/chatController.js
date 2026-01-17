import Chat from "../models/Chat.js";

// Create or get one-to-one chat
export const accessChat = async (req, res) => {
  const { userId } = req.body;

  let chat = await Chat.findOne({
    isGroupChat: false,
    users: { $all: [req.user._id, userId] }
  }).populate("users", "-password");

  if (chat) return res.json(chat);

  const newChat = await Chat.create({
    users: [req.user._id, userId]
  });

  const fullChat = await Chat.findById(newChat._id).populate("users", "-password");
  res.status(201).json(fullChat);
};
