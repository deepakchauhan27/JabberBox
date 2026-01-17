import { useState } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ chat }) => {
  const [message, setMessage] = useState("");

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    console.log("Send:", message);
    setMessage("");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white font-semibold">
        {chat.name}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <MessageBubble text="Hello!" isOwn />
        <MessageBubble text="Hi, how are you?" />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="p-4 flex gap-2 bg-white border-t"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
          placeholder="Type a message"
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
