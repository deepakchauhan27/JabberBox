import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  const message = await Message.create({
    sender: req.user._id,
    chat: chatId,
    content
  });

  const fullMessage = await Message.findById(message._id)
    .populate("sender", "name email")
    .populate("chat");

  res.status(201).json(fullMessage);
};

export const getMessages = async (req, res) => {
  const messages = await Message.find({ chat: req.params.chatId })
    .populate("sender", "name email")
    .sort("createdAt");

  res.json(messages);
};
