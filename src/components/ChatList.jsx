const ChatList = ({ chats = [], selectedChat, onSelectChat }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto text-gray-800">
      <div className="p-4 text-xl font-semibold border-b">
        Chats
      </div>

      {chats.length === 0 && (
        <p className="p-4 text-gray-500">No chats found</p>
      )}

      {chats.map((chat) => {
        // 🔥 find the other user
        const otherUser = chat.users?.find(
          (u) => u._id !== loggedUser._id
        );

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

            {/* <div className="text-sm text-gray-600">
              {otherUser?.email || ""}
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
