import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [name, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("user"); // backend value

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/register`,
        { name, email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        alert("Signup successful! Please log in.");
        navigate("/login");
      } else {
        alert(res.data.message || "Signup failed");
      }
    } catch (error) {
      console.log("Signup error:", error.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 flex justify-center items-center">
      {/* Background text - hidden on small screens */}
      <h1 className="hidden md:flex absolute text-[16rem] font-bold text-zinc-900 select-none">
        NEXORA
      </h1>

      {/* Form container */}
      <div className="bg-zinc-800 rounded-xl w-full max-w-md p-6 md:p-8 shadow-xl z-10">
        <h1 className="text-zinc-300 text-3xl md:text-4xl font-bold mb-2">
          Register
        </h1>
        <p className="text-zinc-400 text-sm mb-4">
          Join our platform to access exclusive job listings
        </p>

        <form className="flex flex-col gap-3" onSubmit={handlesubmit}>
          <label className="text-zinc-300">Username</label>
          <input
            className="border border-zinc-500 rounded-md w-full p-2 bg-zinc-900"
            type="text"
            value={name}
            onChange={(e) => setusername(e.target.value)}
            required
          />

          <label className="text-zinc-300">Email</label>
          <input
            className="border border-zinc-500 rounded-md w-full p-2 bg-zinc-900"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />

          <label className="text-zinc-300">Password</label>
          <input
            className="border border-zinc-500 rounded-md w-full p-2 bg-zinc-900"
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />

          <label className="text-zinc-300 mt-2">Register as</label>
          <div className="flex gap-4 text-sm">
            <label className="text-white flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={(e) => setrole(e.target.value)}
              />
              Employee
            </label>

            <label className="text-white flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setrole(e.target.value)}
              />
              Employer
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-5 bg-red-700 rounded-md py-2 hover:bg-red-800 duration-100"
          >
            Register
          </button>

          <span
            onClick={() => navigate("/login")}
            className="text-xs cursor-pointer text-red-500 hover:text-red-700 mt-2 inline-block"
          >
            Already have an account? Log in
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
