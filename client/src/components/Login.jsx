import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/login`,
        { email, password },
        { withCredentials: true } 
      );

      if (!res.data.success) {
        alert(res.data.message || "Login failed");
        return;
      }

      const { loggedInUser, accessToken } = res.data;

      
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", loggedInUser.role);


      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white">
      <div className="bg-zinc-800 p-6 rounded-xl w-[360px]">
        <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
        <p className="text-sm text-zinc-400 mb-4">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="p-2 rounded-md bg-zinc-900 border border-zinc-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="p-2 rounded-md bg-zinc-900 border border-zinc-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-2 rounded-md ${
              loading
                ? "bg-zinc-600"
                : "bg-red-700 hover:bg-red-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <span
              onClick={() => navigate("/signup")}
              className="text-xs cursor-pointer text-red-500 hover:text-red-700"
            >
              new here? register now
            </span>
      </div>
    </div>
  );
}

export default Login;
