import React, { useEffect, useState } from "react";
import userApi from "../../api/userApi";
import Dashboard from "../../components/Dashboard";

function UserDashboard() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);
  const [error, setError] = useState("");

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

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

  const handleApply = async (jobId) => {
    try {
      await userApi.post(`/jobs/${jobId}/apply`);
      alert("Applied successfully");
      fetchApplications();
    } catch (err) {
      alert("Already applied or error applying");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

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
    <div className="app-shell">
      <main className="section-wrap">
        <Dashboard />

        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="badge mb-3">Employee dashboard</p>
            <h1 className="text-4xl font-bold text-white">Find your next role</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Browse open positions, filter quickly, and track your applications.
            </p>
          </div>
          <a href="/user/profile" className="btn-secondary">
            View profile
          </a>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-red-200">
            {error}
          </div>
        )}

        <section className="panel mb-8">
          <div className="grid gap-3 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search title"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-input"
            />
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="form-select"
            >
              <option value="">All types</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Available jobs</h2>
            <span className="badge">{filteredJobs.length} open</span>
          </div>

          {loadingJobs ? (
            <div className="empty-state">Loading jobs...</div>
          ) : filteredJobs.length === 0 ? (
            <div className="empty-state">No jobs available</div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job) => (
                <article key={job._id} className="panel">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="badge">{job.jobType}</span>
                        <span className="badge">{job.status}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                      <p className="mt-1 text-slate-400">{job.location}</p>
                    </div>
                    <button
                      onClick={() => handleApply(job._id)}
                      disabled={job.status !== "open"}
                      className={`btn-primary md:min-w-32 ${
                        job.status !== "open" ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">My applications</h2>
            <span className="badge">{applications.length} total</span>
          </div>

          {loadingApps ? (
            <div className="empty-state">Loading applications...</div>
          ) : applications.length === 0 ? (
            <div className="empty-state">No applications yet</div>
          ) : (
            <div className="grid gap-3">
              {applications.map((app) => (
                <article key={app._id} className="panel">
                  <h3 className="font-bold text-white">{app.jobId?.title || "Job"}</h3>
                  <p className="mt-2 text-slate-400">
                    Status: <span className="capitalize text-slate-200">{app.status}</span>
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default UserDashboard;
