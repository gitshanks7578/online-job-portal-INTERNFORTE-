// routes/user.routes.js
import express from "express";
import {
  getAllJobs,
  getJobById,
  applyForJob,
  getMyApplications,
  getUserProfile,
  updateUserProfile
} from "../controllers/user.controller.js";

const userrouter = express.Router();

// Jobs
userrouter.get("/jobs", getAllJobs);           // List all jobs with optional filters
userrouter.get("/jobs/:jobId", getJobById);   // Get single job details

// Applications
userrouter.post("/jobs/:jobId/apply", applyForJob); // Apply for a job
userrouter.get("/applications", getMyApplications); // Get own applications

// User Profile
userrouter.get("/profile", getUserProfile);        // View own profile
userrouter.put("/profile", updateUserProfile);     // Update profile

export default userrouter;
