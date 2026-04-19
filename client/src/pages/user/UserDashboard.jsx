import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";

function UserDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);
  const [error, setError] = useState("");

  // Filter states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoadingJobs(true);
    try {
      const res = await userApi.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  // Fetch my applications
  const fetchApplications = async () => {
    setLoadingApps(true);
    try {
      const res = await userApi.get("/applications");
      setApplications(res.data);
    } catch (err) {
      setError("Failed to fetch applications");
      console.error(err);
    } finally {
      setLoadingApps(false);
    }
  };

  // Apply for a job
  const handleApply = async (jobId) => {
    try {
      await userApi.post(`/jobs/${jobId}/apply`);
      alert("Applied successfully");
      fetchApplications(); // refresh applications
    } catch (err) {
      alert("Already applied or error applying");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  // Frontend filtering
  const filteredJobs = jobs.filter((job) => {
    const matchKeyword = keyword
      ? job.title.toLowerCase().includes(keyword.toLowerCase())
      : true;
    const matchLocation = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
      : true;
    const matchJobType = jobType ? job.jobType === jobType : true;
    return matchKeyword && matchLocation && matchJobType;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        <a href="/user/profile" className="text-red-500 underline">
          View Profile
        </a>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Filters */}
      <section className="mb-6 flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search title..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        />
        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="p-2 rounded bg-zinc-800"
        >
          <option value="">All Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="contract">Contract</option>
        </select>
      </section>

      {/* JOB LIST */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>

        {loadingJobs ? (
          <p>Loading jobs...</p>
        ) : filteredJobs.length === 0 ? (
          <p>No jobs available</p>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-zinc-800 p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-zinc-400">{job.location}</p>
                  <p className="text-zinc-400 capitalize">
                    {job.jobType} • {job.status}
                  </p>
                </div>
                <button
                  onClick={() => handleApply(job._id)}
                  disabled={job.status !== "open"}
                  className={`px-4 py-2 rounded-md ${
                    job.status === "open"
                      ? "bg-red-700 hover:bg-red-800"
                      : "bg-zinc-700 cursor-not-allowed"
                  }`}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* APPLICATIONS */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>

        {loadingApps ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <p>No applications yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {applications.map((app) => (
              <div key={app._id} className="bg-zinc-800 p-4 rounded-md">
                <h3 className="font-semibold">
                  {app.jobId?.title || "Job"}
                </h3>
                <p className="text-zinc-400">
                  Status:{" "}
                  <span className="capitalize">{app.status}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;
