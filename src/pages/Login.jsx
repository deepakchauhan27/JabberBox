import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/Jabberbox_logo_new.png";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ Success
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect to chat page (create later)
      navigate("/chat");
    } catch (err) {
      setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-500 via-teal-500 to-emerald-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Logo */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10">
        <img className="h-14 md:h-20" src={logo} alt="JabberBox Logo" />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Login to{" "}
          <span className="font-semibold text-indigo-600">JabberBox</span>
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mt-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span className="cursor-pointer hover:underline">
            Forgot password?
          </span>
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-indigo-600 font-medium hover:underline"
          >
            Create account
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
