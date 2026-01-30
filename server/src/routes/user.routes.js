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
userrouter.get("/jobs", getAllJobs);          
userrouter.get("/jobs/:jobId", getJobById);  

// Applications
userrouter.post("/jobs/:jobId/apply", applyForJob); 
userrouter.get("/applications", getMyApplications); 

// User Profile
userrouter.get("/profile", getUserProfile);       
userrouter.put("/profile", updateUserProfile);     

export default userrouter;
