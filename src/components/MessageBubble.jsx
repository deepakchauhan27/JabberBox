const MessageBubble = ({ text, isOwn }) => {
  return (
    <div
      className={`max-w-xs mb-3 px-4 py-2 rounded-xl ${
        isOwn
          ? "ml-auto bg-indigo-600 text-white"
          : "mr-auto bg-white text-gray-800 border"
      }`}
    >
      {text}
    </div>
  );
};

export default MessageBubble;
