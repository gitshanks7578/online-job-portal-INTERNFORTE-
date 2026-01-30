

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegisterNow = () => {
//     navigate("/signup");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_AXIOS_BASE_URL}/login`,
//         { email, password },
//         { withCredentials: true },
//       );

//       if (res.data.success) {
//         const { loggedInUser, accessToken, refreshToken } = res.data;

//         // store auth data
//         localStorage.setItem("token", accessToken || refreshToken);
//         localStorage.setItem("role", loggedInUser.role); // 👈 REQUIRED

//         // role-based redirect
//         if (loggedInUser.role === "admin") {
//           navigate("/admin");
//         } else if (loggedInUser.role === "user") {
//           navigate("/user");
//         } else {
//           navigate("/login");
//         }
//       }
//     } catch (error) {
//       console.error("Login error:", error.message);
//       alert("Server error. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleforgetpassword = (e) => {
//     e.preventDefault();
//     navigate("/verify");
//   };

//   return (
//     <div className="relative">
//       <div className="w-full h-screen bg-zinc-950 absolute top-0 left-0">
//         <h1 className="h-screen flex justify-center items-center text-[16rem] font-bold text-zinc-900">
//           NEXORA
//         </h1>
//       </div>

//       <div className="text-white w-full h-screen absolute top-0 left-0 flex justify-center items-center">
//         <div className="bg-zinc-800 rounded-xl w-[25%] shadow-xl">
//           <h1 className="text-zinc-300 text-4xl pt-5 mx-5">Welcome back</h1>

//           <form className="p-5 flex flex-col gap-3" onSubmit={handleSubmit}>
//             <label className="text-zinc-300">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
//               required
//             />

//             <label className="text-zinc-300">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-zinc-500 rounded-md w-full p-2 bg-transparent text-white"
//               required
//             />

//             <span
//               onClick={handleforgetpassword}
//               className="text-xs cursor-pointer text-red-500 hover:text-red-700"
//             >
//               Forget password?
//             </span>

//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full mt-5 rounded-md py-2 ${
//                 loading ? "bg-zinc-600" : "bg-red-700 hover:bg-red-800"
//               }`}
//             >
//               {loading ? "Logging in..." : "Log in"}
//             </button>

//             <span
//               onClick={handleRegisterNow}
//               className="text-xs cursor-pointer text-zinc-500 hover:text-zinc-400 mt-2"
//             >
//               Don’t have an account? Register Now
//             </span>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

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
        { withCredentials: true } // 👈 REQUIRED for cookies
      );

      if (!res.data.success) {
        alert(res.data.message || "Login failed");
        return;
      }

      const { loggedInUser, accessToken } = res.data;

      // 🔐 store ONLY access token
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", loggedInUser.role);

      // 🔀 role-based redirect
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
