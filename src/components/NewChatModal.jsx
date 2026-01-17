import { useEffect, useState } from "react";

const NewChatModal = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Start New Chat</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && users.length === 0 && (
            <p className="text-center text-gray-500">
              No users found
            </p>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="p-3 border rounded cursor-pointer hover:bg-gray-100"
            >
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
