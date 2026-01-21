const MessageBubble = ({ text, isOwn, createdAt }) => {
  const time = createdAt
    ? new Date(createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className={`max-w-xs mb-3 px-4 py-2 rounded-xl ${
        isOwn
          ? "ml-auto bg-indigo-600 text-white"
          : "mr-auto bg-white text-gray-800 border"
      }`}
    >
      <p className="wrap-break-words">{text}</p>

      <div
        className={`mt-1 text-xs text-right ${
          isOwn ? "text-indigo-200" : "text-gray-400"
        }`}
      >
        {time}
      </div>
    </div>
  );
};

export default MessageBubble;
