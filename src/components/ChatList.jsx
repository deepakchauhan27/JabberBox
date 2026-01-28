const ChatList = ({ chats = [], selectedChat, onSelectChat }) => {
  // ✅ SAFE localStorage parse (added)
  let loggedUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    loggedUser = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    loggedUser = null;
  }

  // ✅ Guard against invalid chats
  if (!Array.isArray(chats)) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 flex items-center justify-center text-gray-500">
        No chats found
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto text-gray-800">
      <div className="p-4 text-xl font-semibold bg-indigo-600 text-white border-b">
        Chats
      </div>

      {chats.length === 0 && (
        <p className="p-4 text-gray-500">No chats found</p>
      )}

      {chats.map((chat) => {
        // 🔥 find the other user (SAFE)
        const otherUser = loggedUser
          ? chat.users?.find((u) => u._id !== loggedUser._id)
          : null;

        return (
          <div
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 cursor-pointer transition ${
              selectedChat?._id === chat._id
                ? "bg-indigo-100 border-l-4 border-indigo-600"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="font-medium text-gray-900">
              {otherUser?.name || "Unknown User"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
