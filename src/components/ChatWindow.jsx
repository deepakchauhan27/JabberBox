import { useEffect, useState, useRef } from "react";
import MessageBubble from "./MessageBubble";
import socket from "../services/socket";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");

  // ✅ SAFE loggedUser parse (ADDED)
  let loggedUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    loggedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    loggedUser = null;
  }

  // 🔹 Fetch messages + join socket room
  useEffect(() => {
    if (!chat) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/messages/${chat._id}`, // ✅ env URL
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();

    socket.connect();
    socket.emit("joinChat", chat._id);

    return () => {
      socket.off("receiveMessage");
    };
  }, [chat]);

  // 🔹 Listen real-time messages
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  // 🔹 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔹 Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !chat) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/messages`, // ✅ env URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            chatId: chat._id,
            content: text,
          }),
        }
      );

      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("sendMessage", newMessage);
      setText("");
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  // 🔹 Empty state
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500 text-lg">
        Select a chat to start messaging
      </div>
    );
  }

  // 🔹 Find other user (SAFE)
  const otherUser = loggedUser
    ? chat.users?.find((u) => u._id !== loggedUser._id)
    : null;

  return (
    <div className="flex-1 flex flex-col bg-gray-100">

      {/* 🔹 HEADER */}
      <div className="h-16 px-4 flex items-center gap-3 border-b bg-white shadow-sm">
        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
          {otherUser?.name?.[0]?.toUpperCase() || "?"}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {otherUser?.name || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      {/* 🔹 MESSAGES */}
      <div className="flex-1 px-4 py-3 overflow-y-auto">
        {Array.isArray(messages) &&
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              text={msg.content}
              createdAt={msg.createdAt}
              isOwn={loggedUser && msg.sender?._id === loggedUser._id} // ✅ SAFE
            />
          ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 🔹 INPUT BAR */}
      <form
        onSubmit={sendMessage}
        className="h-16 px-4 flex items-center gap-3 border-t bg-white"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 h-10 px-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="h-10 px-6 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
