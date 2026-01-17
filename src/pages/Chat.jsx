import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const dummyChats = [
  { _id: "1", name: "Rahul", lastMessage: "Hey!", time: "10:30 AM" },
  { _id: "2", name: "Aditi", lastMessage: "See you", time: "Yesterday" },
];

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatList
        chats={dummyChats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatWindow chat={selectedChat} />
    </div>
  );
};

export default Chat;
