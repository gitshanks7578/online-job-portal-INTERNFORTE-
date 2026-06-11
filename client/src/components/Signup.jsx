import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("user");

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/auth/register`,
        { name, email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.log("Signup error:", error);
      if (error.response) {
        console.log("Backend response data:", error.response.data);
        console.log("Backend response status:", error.response.status);
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="brand-watermark">NEXORA</div>
      <div className="auth-card">
        <div className="mb-6">
          <p className="badge mb-4">Create account</p>
          <h1 className="text-3xl font-bold text-white">Join Nexora</h1>
          <p className="mt-2 text-sm text-slate-400">
            Build your profile and connect with the right opportunities.
          </p>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
          <label className="field-label">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setusername(e.target.value)}
            required
            className="form-input"
          />

          <label className="field-label mt-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
            className="form-input"
          />

          <label className="field-label mt-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            className="form-input"
          />

          <label className="field-label mt-2">Register as</label>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`cursor-pointer rounded-2xl border p-3 text-sm ${
                role === "user"
                  ? "border-red-400/60 bg-red-500/12 text-white"
                  : "border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setrole(e.target.value)}
                className="sr-only"
              />
              Employee
            </label>

            <label
              className={`cursor-pointer rounded-2xl border p-3 text-sm ${
                role === "admin"
                  ? "border-red-400/60 bg-red-500/12 text-white"
                  : "border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setrole(e.target.value)}
                className="sr-only"
              />
              Employer
            </label>
          </div>

          <button type="submit" className="btn-primary mt-4 w-full">
            Register
          </button>

          <span onClick={() => navigate("/login")} className="soft-link mt-2">
            Already have an account? Log in
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
