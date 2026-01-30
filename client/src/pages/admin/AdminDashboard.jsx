

// import React, { useEffect, useState } from "react";
// import adminApi from "../../api/adminApi";

// function AdminDashboard() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [showJobForm, setShowJobForm] = useState(false);
//   const [editingJobId, setEditingJobId] = useState(null);
//   const [jobFormData, setJobFormData] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     location: "",
//     jobType: "",
//     deadline: "",
//   });

//   const [selectedJob, setSelectedJob] = useState(null);
//   const [applications, setApplications] = useState([]);

//   /* ---------------- FETCH JOBS ---------------- */
//   const fetchJobs = async () => {
//     setLoading(true);
//     try {
//       const res = await adminApi.get("/jobs");
//       setJobs(res.data);
//     } catch (err) {
//       console.error("Fetch jobs error:", err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   /* ---------------- OPEN JOB FORM ---------------- */
//   const openJobForm = (job = null) => {
//     if (job) {
//       setJobFormData({
//         title: job.title || "",
//         description: job.description || "",
//         requirements: job.requirements || "",
//         location: job.location || "",
//         jobType: job.jobType || "",
//         deadline: job.deadline ? job.deadline.split("T")[0] : "",
//       });
//       setEditingJobId(job._id);
//     } else {
//       setJobFormData({
//         title: "",
//         description: "",
//         requirements: "",
//         location: "",
//         jobType: "",
//         deadline: "",
//       });
//       setEditingJobId(null);
//     }
//     setShowJobForm(true);
//   };

//   /* ---------------- SUBMIT JOB FORM ---------------- */
//   const handleJobFormSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       title: jobFormData.title,
//       description: jobFormData.description,
//       requirements: jobFormData.requirements,
//       location: jobFormData.location,
//       jobType: jobFormData.jobType,
//       deadline: new Date(jobFormData.deadline),
//     };
//     try {
//       if (editingJobId) {
//         await adminApi.put(`/jobs/${editingJobId}`, payload);
//       } else {
//         await adminApi.post("/jobs", payload);
//       }
//       setShowJobForm(false);
//       fetchJobs();
//     } catch (err) {
//       console.error("Submit job error:", err.response?.data || err.message);
//     }
//   };

//   /* ---------------- DELETE JOB ---------------- */
//   const handleDelete = async (jobId) => {
//     if (!window.confirm("Delete this job?")) return;
//     try {
//       await adminApi.delete(`/jobs/${jobId}`);
//       setJobs((prev) => prev.filter((j) => j._id !== jobId));
//     } catch (err) {
//       console.error("Delete job error:", err.response?.data || err.message);
//     }
//   };

//   /* ---------------- TOGGLE JOB STATUS ---------------- */
//   const toggleStatus = async (job) => {
//     const newStatus = job.status === "open" ? "filled" : "open";
//     try {
//       await adminApi.patch(`/jobs/${job._id}/status`, { status: newStatus });
//       setJobs((prev) =>
//         prev.map((j) => (j._id === job._id ? { ...j, status: newStatus } : j)),
//       );
//     } catch (err) {
//       console.error("Toggle status error:", err.response?.data || err.message);
//     }
//   };

//   /* ---------------- FETCH APPLICATIONS ---------------- */
//   const fetchApplications = async (job) => {
//     setSelectedJob(job);
//     setLoading(true);
//     try {
//       const res = await adminApi.get(`/jobs/${job._id}/applications`);
//       console.log(res.data);
//       setApplications(res.data);
//     } catch (err) {
//       console.error(
//         "Fetch applications error:",
//         err.response?.data || err.message,
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- UPDATE APPLICATION STATUS ---------------- */
//   const updateApplicationStatus = async (appId, status) => {
//     try {
//       await adminApi.patch(`/applications/${appId}/status`, { status });
//       setApplications((prev) =>
//         prev.map((app) => (app._id === appId ? { ...app, status } : app)),
//       );
//     } catch (err) {
//       console.error(
//         "Update application status error:",
//         err.response?.data || err.message,
//       );
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="min-h-screen bg-zinc-950 text-white p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold">Admin Dashboard</h1>

//         <a href="/admin/profile" className="text-red-500 underline">
//           View Profile
//         </a>
//       </div>

//       {!selectedJob ? (
//         <>
//           <button
//             onClick={() => openJobForm()}
//             className="bg-red-700 px-4 py-2 rounded mb-6"
//           >
//             Create Job
//           </button>

//           {loading ? (
//             <p>Loading...</p>
//           ) : jobs.length === 0 ? (
//             <p>No jobs found.</p>
//           ) : (
//             <div className="space-y-4">
//               {jobs.map((job) => (
//                 <div
//                   key={job._id}
//                   className="bg-zinc-800 p-4 rounded flex justify-between items-center"
//                 >
//                   <div>
//                     <h3 className="text-xl">{job.title}</h3>
//                     <p className="text-zinc-400">{job.location}</p>
//                     <p className="text-zinc-400">Status: {job.status}</p>
//                   </div>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => toggleStatus(job)}
//                       className="bg-red-700 px-3 py-1 rounded"
//                     >
//                       Toggle Status
//                     </button>
//                     <button
//                       onClick={() => openJobForm(job)}
//                       className="bg-zinc-700 px-3 py-1 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(job._id)}
//                       className="bg-zinc-700 px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => fetchApplications(job)}
//                       className="bg-red-700 px-3 py-1 rounded"
//                     >
//                       View Applications
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       ) : (
//         <>
//           <button
//             onClick={() => {
//               setSelectedJob(null);
//               setApplications([]);
//             }}
//             className="mb-4 bg-zinc-700 px-4 py-2 rounded"
//           >
//             ← Back to Jobs
//           </button>

//           <h2 className="text-2xl mb-4">Applications — {selectedJob.title}</h2>

//           {loading ? (
//             <p>Loading...</p>
//           ) : applications.length === 0 ? (
//             <p>No applications yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {applications.map((app) => (
//                 <div key={app._id} className="bg-zinc-800 p-4 rounded">
//                   <p>
//                     <strong>Name:</strong> {app.userId?.name}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {app.userId?.email}
//                   </p>
//                   <p>
//                     <strong>Status:</strong>{" "}
//                     <span className="text-red-400">{app.status}</span>
//                   </p>
//                   {app.resume && (
//                     <a
//                       href={app.resume}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-red-500 underline"
//                     >
//                       View Resume
//                     </a>
//                   )}

//                   <div className="flex gap-2 mt-3">
//                     <button
//                       onClick={() =>
//                         updateApplicationStatus(app._id, "accepted")
//                       }
//                       className="bg-green-700 px-3 py-1 rounded"
//                     >
//                       Accept
//                     </button>
//                     <button
//                       onClick={() =>
//                         updateApplicationStatus(app._id, "rejected")
//                       }
//                       className="bg-red-700 px-3 py-1 rounded"
//                     >
//                       Reject
//                     </button>
//                     <button
//                       onClick={() =>
//                         updateApplicationStatus(app._id, "pending")
//                       }
//                       className="bg-zinc-700 px-3 py-1 rounded"
//                     >
//                       Pending
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* ---------------- JOB FORM MODAL ---------------- */}
//       {showJobForm && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleJobFormSubmit}
//             className="bg-zinc-800 p-6 rounded w-full max-w-md space-y-3"
//           >
//             <input
//               placeholder="Title"
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.title}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, title: e.target.value })
//               }
//               required
//             />
//             <input
//               placeholder="Location"
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.location}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, location: e.target.value })
//               }
//               required
//             />
//             <select
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.jobType}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, jobType: e.target.value })
//               }
//               required
//             >
//               <option value="">Select Job Type</option>
//               <option value="full-time">Full-time</option>
//               <option value="part-time">Part-time</option>
//               <option value="internship">Internship</option>
//               <option value="contract">Contract</option>
//             </select>
//             <input
//               type="date"
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.deadline}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, deadline: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Description"
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.description}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, description: e.target.value })
//               }
//               required
//             />
//             <textarea
//               placeholder="Requirements"
//               className="w-full p-2 bg-zinc-900 rounded"
//               value={jobFormData.requirements}
//               onChange={(e) =>
//                 setJobFormData({ ...jobFormData, requirements: e.target.value })
//               }
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => setShowJobForm(false)}
//                 className="bg-zinc-700 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="bg-red-700 px-4 py-2 rounded">
//                 {editingJobId ? "Update" : "Create"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

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

  /* ---------------- FETCH JOBS ---------------- */
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

  /* ---------------- OPEN JOB FORM ---------------- */
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

  /* ---------------- SUBMIT JOB FORM ---------------- */
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

  /* ---------------- DELETE JOB ---------------- */
  const handleDelete = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await adminApi.delete(`/jobs/${jobId}`);
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      console.error("Delete job error:", err.response?.data || err.message);
    }
  };

  /* ---------------- TOGGLE JOB STATUS ---------------- */
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

  /* ---------------- FETCH APPLICATIONS ---------------- */
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

  /* ---------------- UPDATE APPLICATION STATUS ---------------- */
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
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
        <a href="/admin/profile" className="text-red-500 underline">
          View Profile
        </a>
      </div>

      {!selectedJob ? (
        <>
          <button
            onClick={() => openJobForm()}
            className="bg-red-700 px-4 py-2 rounded mb-4"
          >
            Create Job
          </button>

          {loading ? (
            <p>Loading...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-zinc-800 p-4 rounded flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0"
                >
                  <div className="flex flex-col md:flex-row md:gap-6">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-zinc-400">{job.location}</p>
                      <p className="text-zinc-400">Status: {job.status}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                    <button
                      onClick={() => toggleStatus(job)}
                      className="bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Toggle Status
                    </button>
                    <button
                      onClick={() => openJobForm(job)}
                      className="bg-zinc-700 px-3 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-zinc-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => fetchApplications(job)}
                      className="bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      View Applications
                    </button>
                  </div>
                </div>
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
            className="mb-4 bg-zinc-700 px-4 py-2 rounded"
          >
            ← Back to Jobs
          </button>

          <h2 className="text-2xl mb-4">{selectedJob.title} — Applications</h2>

          {loading ? (
            <p>Loading...</p>
          ) : applications.length === 0 ? (
            <p>No applications yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-zinc-800 p-4 rounded flex flex-col gap-2"
                >
                  <p>
                    <strong>Name:</strong> {app.userId?.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {app.userId?.email}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className="text-red-400">{app.status}</span>
                  </p>
                  {app.resume && (
                    <a
                      href={app.resume}
                      target="_blank"
                      rel="noreferrer"
                      className="text-red-500 underline"
                    >
                      View Resume
                    </a>
                  )}

                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => updateApplicationStatus(app._id, "accepted")}
                      className="bg-green-700 px-3 py-1 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app._id, "rejected")}
                      className="bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => updateApplicationStatus(app._id, "pending")}
                      className="bg-zinc-700 px-3 py-1 rounded text-sm"
                    >
                      Pending
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ---------------- JOB FORM MODAL ---------------- */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleJobFormSubmit}
            className="bg-zinc-800 p-6 rounded w-full max-w-md space-y-3"
          >
            <input
              placeholder="Title"
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.title}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, title: e.target.value })
              }
              required
            />
            <input
              placeholder="Location"
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.location}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, location: e.target.value })
              }
              required
            />
            <select
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.jobType}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, jobType: e.target.value })
              }
              required
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
            <input
              type="date"
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.deadline}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, deadline: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.description}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, description: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Requirements"
              className="w-full p-2 bg-zinc-900 rounded"
              value={jobFormData.requirements}
              onChange={(e) =>
                setJobFormData({ ...jobFormData, requirements: e.target.value })
              }
            />
            <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setShowJobForm(false)}
                className="bg-zinc-700 px-4 py-2 rounded w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-700 px-4 py-2 rounded w-full sm:w-auto"
              >
                {editingJobId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

