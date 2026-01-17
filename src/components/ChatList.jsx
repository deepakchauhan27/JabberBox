const ChatList = ({ chats, selectedChat, onSelectChat }) => {
  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      <div className="p-4 text-xl font-semibold border-b">Chats</div>

      {chats.map((chat) => (
        <div
          key={chat._id}
          onClick={() => onSelectChat(chat)}
          className={`p-4 cursor-pointer hover:bg-gray-100 ${
            selectedChat?._id === chat._id ? "bg-gray-200" : ""
          }`}
        >
          <div className="font-medium">{chat.name}</div>
          <div className="text-sm text-gray-500 truncate">
            {chat.lastMessage}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
