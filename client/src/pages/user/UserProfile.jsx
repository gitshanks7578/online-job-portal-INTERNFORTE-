import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const res = await userApi.get("/profile");
      console.log(res.data);
      setProfile(res.data);
    } catch (err) {
      console.error("Fetch profile error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white p-6">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-xl mx-auto bg-zinc-800 p-6 rounded space-y-4">
        <h1 className="text-3xl font-bold">User Profile</h1>

        <div>
          <p className="text-zinc-400">Name</p>
          <p className="text-lg">{profile.name}</p>
        </div>

        <div>
          <p className="text-zinc-400">Email</p>
          <p className="text-lg">{profile.email}</p>
        </div>

        <div>
          <p className="text-zinc-400">Role</p>
          <p className="text-lg capitalize">{profile.role}</p>
        </div>

        <div>
          <p className="text-zinc-400">Verified</p>
          <p className="text-lg">{profile.isVerified ? "Yes" : "No"}</p>
        </div>

        <div>
          <p className="text-zinc-400">Account Created</p>
          <p className="text-lg">
            {new Date(profile.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={() => navigate("/user")}
          className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
