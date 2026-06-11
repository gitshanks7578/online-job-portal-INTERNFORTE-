import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";

function AdminProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await adminApi.get("/profile");
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
    return <div className="app-shell grid place-items-center p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="app-shell grid place-items-center p-6">Failed to load profile.</div>;
  }

  return (
    <div className="app-shell">
      <main className="section-wrap grid min-h-screen place-items-center">
        <section className="panel w-full max-w-2xl">
          <p className="badge mb-4">Employer profile</p>
          <h1 className="text-3xl font-bold text-white">Your profile</h1>
          <p className="mt-2 text-slate-400">Account details connected to your hiring workspace.</p>

          <div className="mt-8 grid gap-3">
            <ProfileRow label="Name" value={profile.name} />
            <ProfileRow label="Email" value={profile.email} />
            <ProfileRow label="Role" value={profile.role} />
            <ProfileRow label="Verified" value={profile.isVerified ? "Yes" : "No"} />
            <ProfileRow
              label="Account created"
              value={new Date(profile.createdAt).toLocaleDateString()}
            />
          </div>

          <button onClick={() => navigate("/admin")} className="btn-primary mt-8">
            Back to dashboard
          </button>
        </section>
      </main>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold capitalize text-white">{value}</p>
    </div>
  );
}

export default AdminProfile;
