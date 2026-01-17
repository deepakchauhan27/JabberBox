import { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ chat, socket }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!chat) return;

    socket.emit("joinChat", chat._id);

    fetch(`http://localhost:5000/api/messages/${chat._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setMessages);
  }, [chat]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ chatId: chat._id, content: text })
    });

    const message = await res.json();

    socket.emit("sendMessage", message);
    setMessages(prev => [...prev, message]);
    setText("");
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map(m => (
          <MessageBubble
            key={m._id}
            text={m.content}
            isOwn={
              m.sender._id === JSON.parse(localStorage.getItem("user"))._id
            }
          />
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 flex gap-2 border-t">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 border rounded-full px-4 py-2"
          placeholder="Type a message"
        />
        <button className="bg-indigo-600 text-white px-6 rounded-full">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
