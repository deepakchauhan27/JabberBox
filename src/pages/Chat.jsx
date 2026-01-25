import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import NewChatModal from "../components/NewChatModal";

const Chat = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);

  const token = localStorage.getItem("token");

  // 🔥 THIS FUNCTION OPENS CHAT WINDOW
  const openChatWithUser = async (user) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: user._id }),
    });

    const chat = await res.json();

    // add chat to list if new
    setChats((prev) => {
      const exists = prev.find((c) => c._id === chat._id);
      return exists ? prev : [chat, ...prev];
    });

    setSelectedChat(chat); // ✅ CHAT WINDOW OPENS
    setShowModal(false); // ✅ MODAL CLOSES
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/chats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setChats(data);
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar onNewChat={() => setShowModal(true)} />

      <ChatList
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
      />

      <ChatWindow chat={selectedChat} />

      {showModal && (
        <NewChatModal
          onClose={() => setShowModal(false)}
          onUserSelect={openChatWithUser} // 🔥 IMPORTANT
        />
      )}
    </div>
  );
};

export default Chat;
