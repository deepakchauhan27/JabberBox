import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!chat) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/messages/${chat._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      }
    };

    fetchMessages();
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !chat) return;

    try {
      const res = await fetch("http://localhost:5000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chatId: chat._id,
          content: text,
        }),
      });

      const newMessage = await res.json();
      setMessages((prev) => [...prev, newMessage]);
      setText("");
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  // ✅ SAFE EMPTY STATE
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg._id}
            text={msg.content}
            isOwn={msg.sender._id === loggedUser._id}
            createdAt={msg.createdAt} // 👈 ADD THIS
          />
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 flex gap-2 border-t bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 outline-none"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 rounded-full"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
