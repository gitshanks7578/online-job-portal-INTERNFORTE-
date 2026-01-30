// import React from "react";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// function Dashboard() {
//   const navigate = useNavigate()
//   const handleLogout = async() => {
//     try {
//       const res = await axios.post(`${import.meta.env.VITE_AXIOS_BASE_URL}/logout`,{},{
//         withCredentials:true
//       })
//       if(res.data.success){
//           localStorage.removeItem("token")
//       navigate("/login")
//       }
    
//     } catch (error) {
//       console.log("something went wrong logging out",error.message)
//     }
//   };

//   const handleDelete = () => {
//     console.log("Deleting account...");
//   };

//   return (
//     <div className="w-full h-screen bg-zinc-950 text-white flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center w-full px-6 py-4 border-b border-zinc-800">
//         <h1 className="text-2xl font-bold tracking-wider text-zinc-300">
//           NEXORA
//         </h1>

//         <div className="flex gap-3">
//           <button
//             onClick={handleLogout}
//             className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm font-medium text-zinc-300 ease-in duration-100"
//           >
//             Logout
//           </button>
//           <button
//             onClick={handleDelete}
//             className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md text-sm font-medium text-white ease-in duration-100"
//           >
//             Delete Account
//           </button>
//         </div>
//       </header>

//       {/* Center content */}
//       <main className="flex flex-1 items-center justify-center">
//         <p className="text-zinc-500 text-lg sm:text-xl">
//           Welcome back to NEXORA
//         </p>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); // modal visibility

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log("something went wrong logging out", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/removeUser`,{},
        { withCredentials: true }
      );
      if (res.data.success) {
        localStorage.removeItem("token");
        navigate("/signup"); // redirect after account deletion
      }
    } catch (error) {
      console.log("something went wrong deleting account", error.message);
    } finally {
      setShowConfirm(false); // close modal
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-950 text-white flex flex-col relative">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 py-4 border-b border-zinc-800">
        <h1 className="text-2xl font-bold tracking-wider text-zinc-300">
          NEXORA
        </h1>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-sm font-medium text-zinc-300 ease-in duration-100"
          >
            Logout
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md text-sm font-medium text-white ease-in duration-100"
          >
            Delete Account
          </button>
        </div>
      </header>

      {/* Center content */}
      <main className="flex flex-1 items-center justify-center">
        <p className="text-zinc-500 text-lg sm:text-xl">
          Welcome back to NEXORA
        </p>
      </main>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-lg p-6 w-80 text-center flex flex-col gap-4">
            <p className="text-white text-lg font-semibold">
              Are you sure you want to delete your account?
            </p>
            <div className="flex justify-between gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md text-white font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-700 hover:bg-red-800 px-4 py-2 rounded-md text-white font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
