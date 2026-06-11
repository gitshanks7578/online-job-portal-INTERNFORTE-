import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const clearAuthStorage = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  const authConfig = {
    withCredentials: true,
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/auth/logout`,
        {},
        authConfig,
      );

      if (res.data.success) {
        clearAuthStorage();
        navigate("/login");
      }
    } catch (error) {
      console.log("logout failed:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AXIOS_BASE_URL}/auth/removeUser`,
        {},
        authConfig,
      );

      if (res.data.success) {
        clearAuthStorage();
        navigate("/signup");
      }
    } catch (error) {
      console.log("delete account failed:", error.message);
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="mb-8">
      <header className="panel flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="badge mb-2">NEXORA</p>
          <h1 className="text-2xl font-bold text-white">Workspace</h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
          <button onClick={() => setShowConfirm(true)} className="btn-danger">
            Delete account
          </button>
        </div>
      </header>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="panel w-full max-w-sm text-center">
            <h2 className="text-xl font-bold text-white">Delete account?</h2>
            <p className="mt-2 text-sm text-slate-400">
              This will remove your account and related data.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={() => setShowConfirm(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleDelete} className="btn-danger">
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
