import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNewChat }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-72 bg-indigo-600 text-white flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b border-indigo-500">
        <p className="font-semibold text-lg">{user?.name}</p>
        <p className="text-sm opacity-80">{user?.email}</p>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}   // ✅ ONLY THIS
          className="w-full py-2 bg-indigo-500 rounded hover:bg-indigo-700"
        >
          + New Chat
        </button>
      </div>

      {/* Logout */}
      <div className="mt-auto p-3 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-indigo-500 rounded hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
