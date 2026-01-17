import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import socket from "../services/socket";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <ChatList
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />
      <ChatWindow chat={selectedChat} socket={socket} />
    </div>
  );
};

export default Chat;
