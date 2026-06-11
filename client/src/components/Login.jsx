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
        `${import.meta.env.VITE_AXIOS_BASE_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (!res.data.success) {
        alert(res.data.message || "Login failed");
        return;
      }

      // const { loggedInUser, accessToken } = res.data;
      const { loggedInUser, tokens } = res.data;
      const accessToken = tokens?.accessToken;

      if (!loggedInUser || !accessToken) {
        console.log(" Missing data:", res.data);
        alert("Login failed: invalid response");
        return;
      }

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
    <div className="auth-page">
      <div className="brand-watermark">NEXORA</div>
      <div className="auth-card">
        <div className="mb-6">
          <p className="badge mb-4">Job Portal</p>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to continue your hiring journey.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label mt-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`btn-primary mt-4 w-full ${loading ? "opacity-70" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-5 flex flex-col gap-2">
          <span onClick={() => navigate("/signup")} className="soft-link">
            New here? Register now
          </span>
          <span onClick={() => navigate("/verify")} className="soft-link text-slate-400">
            Forgot password?
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
