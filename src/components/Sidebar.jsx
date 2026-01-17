import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-80 bg-indigo-600 text-white flex flex-col">
      
      {/* User Header */}
      <div className="p-4 flex items-center justify-between border-b border-indigo-500">
        <div>
          <p className="font-semibold">{user?.name || "User"}</p>
          <p className="text-sm opacity-80">{user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm bg-indigo-500 px-3 py-1 rounded hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full px-3 py-2 rounded bg-indigo-500 placeholder-white text-white focus:outline-none"
        />
      </div>

      {/* Actions */}
      <div className="p-3 border-t border-indigo-500">
        <button className="w-full py-2 bg-indigo-500 rounded hover:bg-indigo-700">
          + New Chat
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
