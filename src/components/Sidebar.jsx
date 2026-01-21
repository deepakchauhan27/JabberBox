import { useNavigate } from "react-router-dom";

const Sidebar = ({ onNewChat }) => {
  const navigate = useNavigate();

  // ✅ ADD THIS SAFE GUARD (minimal change)
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ✅ OPTIONAL SAFETY: if user missing, logout silently
  if (!user) {
    localStorage.clear();
    navigate("/");
    return null;
  }

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
          onClick={onNewChat}   // ✅ unchanged
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

      <div className="p-3 text-center text-xs opacity-70">
        <h4>© 2026 JabberBox. | All rights reserved</h4>
      </div>
    </div>
  );
};

export default Sidebar;
