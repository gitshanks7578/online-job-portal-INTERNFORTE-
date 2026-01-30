import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
  getApplicationsByJob,
  updateApplicationStatus,
  getAdminProfile,
  updateAdminProfile
} from "../controllers/admin.controller.js";

const adminrouter = express.Router();

/**
 * JOB ROUTES
 */
adminrouter.post("/jobs", createJob);                  // Create a job
adminrouter.get("/jobs", getAllJobs);                 // Get all jobs
adminrouter.get("/jobs/:jobId", getJobById);         // Get single job by ID
adminrouter.put("/jobs/:jobId", updateJob);          // Update job
adminrouter.delete("/jobs/:jobId", deleteJob);       // Delete job
adminrouter.patch("/jobs/:jobId/status", updateJobStatus); // Update job status

/**
 * APPLICATION ROUTES
 */
adminrouter.get("/jobs/:jobId/applications", getApplicationsByJob); // Get all applications for a job
adminrouter.patch("/applications/:applicationId/status", updateApplicationStatus); // Update application status

adminrouter.get("/profile", getAdminProfile);        // View own profile
adminrouter.put("/profile", updateAdminProfile);

export default adminrouter;
