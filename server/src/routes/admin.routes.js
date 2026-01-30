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

adminrouter.post("/jobs", createJob);                 
adminrouter.get("/jobs", getAllJobs);              
adminrouter.get("/jobs/:jobId", getJobById);      
adminrouter.put("/jobs/:jobId", updateJob);       
adminrouter.delete("/jobs/:jobId", deleteJob);      
adminrouter.patch("/jobs/:jobId/status", updateJobStatus); 


adminrouter.get("/jobs/:jobId/applications", getApplicationsByJob); 
adminrouter.patch("/applications/:applicationId/status", updateApplicationStatus);

adminrouter.get("/profile", getAdminProfile);       
adminrouter.put("/profile", updateAdminProfile);

export default adminrouter;
