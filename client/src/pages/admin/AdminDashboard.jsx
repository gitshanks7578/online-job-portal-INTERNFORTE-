import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";
import Dashboard from "../../components/Dashboard";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    jobType: "",
    deadline: "",
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch jobs error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const openJobForm = (job = null) => {
    if (job) {
      setJobFormData({
        title: job.title || "",
        description: job.description || "",
        requirements: job.requirements || "",
        location: job.location || "",
        jobType: job.jobType || "",
        deadline: job.deadline ? job.deadline.split("T")[0] : "",
      });
      setEditingJobId(job._id);
    } else {
      setJobFormData({
        title: "",
        description: "",
        requirements: "",
        location: "",
        jobType: "",
        deadline: "",
      });
      setEditingJobId(null);
    }
    setShowJobForm(true);
  };

  const handleJobFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: jobFormData.title,
      description: jobFormData.description,
      requirements: jobFormData.requirements,
      location: jobFormData.location,
      jobType: jobFormData.jobType,
      deadline: new Date(jobFormData.deadline),
    };
    try {
      if (editingJobId) {
        await adminApi.put(`/jobs/${editingJobId}`, payload);
      } else {
        await adminApi.post("/jobs", payload);
      }
      setShowJobForm(false);
      fetchJobs();
    } catch (err) {
      console.error("Submit job error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await adminApi.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      console.error("Delete job error:", err.response?.data || err.message);
    }
  };

  const toggleStatus = async (job) => {
    const newStatus = job.status === "open" ? "filled" : "open";
    try {
      await adminApi.patch(`/jobs/${job._id}/status`, { status: newStatus });
      setJobs((prev) =>
        prev.map((j) => (j._id === job._id ? { ...j, status: newStatus } : j)),
      );
    } catch (err) {
      console.error("Toggle status error:", err.response?.data || err.message);
    }
  };

  const fetchApplications = async (job) => {
    setSelectedJob(job);
    setLoading(true);
    try {
      const res = await adminApi.get(`/jobs/${job._id}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error("Fetch applications error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (appId, status) => {
    try {
      await adminApi.patch(`/applications/${appId}/status`, { status });
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status } : app)),
      );
    } catch (err) {
      console.error("Update application status error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="app-shell">
      <main className="section-wrap">
        <Dashboard />

        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="badge mb-3">Employer dashboard</p>
            <h1 className="text-4xl font-bold text-white">Manage roles</h1>
            <p className="mt-2 max-w-2xl text-slate-400">
              Create listings, review applications, and keep every role status clear.
            </p>
          </div>
          <a href="/admin/profile" className="btn-secondary">
            View profile
          </a>
        </section>

        {!selectedJob ? (
          <>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-white">Your jobs</h2>
              <button onClick={() => openJobForm()} className="btn-primary">
                Create job
              </button>
            </div>

            {loading ? (
              <div className="empty-state">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="empty-state">No jobs found.</div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job) => (
                  <article key={job._id} className="panel">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="badge">{job.status}</span>
                          {job.jobType && <span className="badge">{job.jobType}</span>}
                        </div>
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        <p className="mt-1 text-slate-400">{job.location}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => toggleStatus(job)} className="btn-secondary">
                          Toggle status
                        </button>
                        <button onClick={() => openJobForm(job)} className="btn-secondary">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(job._id)} className="btn-danger">
                          Delete
                        </button>
                        <button onClick={() => fetchApplications(job)} className="btn-primary">
                          View applications
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setSelectedJob(null);
                setApplications([]);
              }}
              className="btn-secondary mb-5"
            >
              Back to jobs
            </button>

            <div className="mb-5">
              <p className="badge mb-3">Applications</p>
              <h2 className="text-3xl font-bold text-white">{selectedJob.title}</h2>
            </div>

            {loading ? (
              <div className="empty-state">Loading applications...</div>
            ) : applications.length === 0 ? (
              <div className="empty-state">No applications yet.</div>
            ) : (
              <div className="grid gap-4">
                {applications.map((app) => (
                  <article key={app._id} className="panel">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {app.userId?.name || "Applicant"}
                        </h3>
                        <p className="text-slate-400">{app.userId?.email}</p>
                        <p className="mt-2">
                          <span className="badge">{app.status}</span>
                        </p>
                        {app.resume && (
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="soft-link mt-3 inline-flex"
                          >
                            View resume
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateApplicationStatus(app._id, "accepted")}
                          className="btn-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app._id, "rejected")}
                          className="btn-danger"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateApplicationStatus(app._id, "pending")}
                          className="btn-secondary"
                        >
                          Pending
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}

        {showJobForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
            <form onSubmit={handleJobFormSubmit} className="panel w-full max-w-xl space-y-3">
              <div className="mb-4">
                <p className="badge mb-3">{editingJobId ? "Edit job" : "New job"}</p>
                <h2 className="text-2xl font-bold text-white">
                  {editingJobId ? "Update listing" : "Create listing"}
                </h2>
              </div>

              <input
                placeholder="Title"
                className="form-input"
                value={jobFormData.title}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, title: e.target.value })
                }
                required
              />
              <input
                placeholder="Location"
                className="form-input"
                value={jobFormData.location}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, location: e.target.value })
                }
                required
              />
              <select
                className="form-select"
                value={jobFormData.jobType}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, jobType: e.target.value })
                }
                required
              >
                <option value="">Select job type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
              <input
                type="date"
                className="form-input"
                value={jobFormData.deadline}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, deadline: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                className="form-textarea"
                value={jobFormData.description}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, description: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Requirements"
                className="form-textarea"
                value={jobFormData.requirements}
                onChange={(e) =>
                  setJobFormData({ ...jobFormData, requirements: e.target.value })
                }
              />
              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingJobId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
