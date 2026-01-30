// controllers/user.controller.js
import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js";
import { user } from "../models/user.model.js";

/**
 * Get all jobs with optional search & filters
 * GET /users/jobs?keyword=&location=&jobType=
 */
export const getAllJobs = async (req, res) => {
  try {
    const { keyword, location, jobType } = req.query;

    let query = { status: "open" };

    if (keyword) query.title = { $regex: keyword, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };
    if (jobType) query.jobType = jobType;

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

/**
 * Get single job by ID
 * GET /users/jobs/:jobId
 */
export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: "Invalid job ID" });
  }
};

/**
 * Apply for a job
 * POST /users/jobs/:jobId/apply
 * req.body can contain optional fields like resumeUrl
 */
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    // const { resume } = req.body;
    const userId = req.User._id; // assume verifyToken middleware sets req.user

     if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if user already applied
    const existingApplication = await Application.findOne({ jobId, userId });
    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }
    

    const application = await Application.create({
      jobId,
      userId,
      status: "pending",
      // resume
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ error: "Failed to apply for job" });
  }
};

/**
 * Get all applications of logged-in user
 * GET /users/applications
 */
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.User._id; // assume verifyToken middleware sets req.user

    const applications = await Application.find({ userId })
      .populate("jobId") // include job details
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your applications" });
  }
};

/**
 * Get logged-in user profile
 * GET /users/profile
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.User._id;

    const currentUser = await user.findById(userId).select("-password -refreshToken");

    if (!currentUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(currentUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

/**
 * Update logged-in user profile
 * PUT /users/profile
 */
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.User._id;
    const { name, email } = req.body;

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update profile" });
  }
};
