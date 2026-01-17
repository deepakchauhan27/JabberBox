const ChatList = ({ chats = [], selectedChat, onSelectChat }) => {
  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      <div className="p-4 text-xl font-semibold border-b">Chats</div>

      {chats.length === 0 && (
        <p className="p-4 text-gray-500">No users found</p>
      )}

      {chats.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelectChat(user)}
          className={`p-4 cursor-pointer hover:bg-gray-100 ${
            selectedChat?._id === user._id ? "bg-gray-200" : ""
          }`}
        >
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
