import {Job} from "../models/job.model.js"
import { Application } from "../models/application.model.js";
import { user } from "../models/user.model.js";
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      jobType,
      deadline
    } = req.body;

    // basic required field check
    if (!title || !description || !location || !jobType || !deadline) {
      return res.status(400).json({
        message: "All required fields must be filled"
      });
    }

    const job = await Job.create({
      ...req.body,
      createdby: req.User._id 
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



export const getAllJobs = async (req, res) => {
  try {
    // const jobs = await Job.find();
    const jobs = await Job.find({ createdby : req.User._id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({
      error: "Invalid job ID"
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      req.body,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update job"
    });
  }
};



export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const deletedJob = await Job.findByIdAndDelete(jobId);

    if (!deletedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json({
      message: "Job deleted successfully"
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to delete job"
    });
  }
};



export const updateJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status } = req.body;

    // Allowed values
    const allowedStatuses = ["open", "closed", "filled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update job status"
    });
  }
};


//applications



// export const getApplicationsByJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;

//     const applications = await Application.find({ jobId });

//     res.status(200).json(applications);
//   } catch (error) {
//     res.status(400).json({
//       error: "Failed to fetch applications"
//     });
//   }
// };
export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Populate userId field with name and email
    const applications = await Application.find({ jobId })
      .populate("userId", "name email");

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Failed to fetch applications"
    });
  }
};



export const updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["accepted", "rejected", "pending"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({
      error: "Failed to update application status"
    });
  }
};

// export const getAdminProfile = async (req, res) => {
//   try {
//     const userId = req.User._id;

//     const currentUser = await user.findById(userId).select("-password -refreshToken");

//     if (!currentUser) return res.status(404).json({ message: "User not found" });

//     res.status(200).json(currentUser);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch profile" });
//   }
// };
export const getAdminProfile = async (req, res) => {
  try {
    const userId = req.User._id;

    const currentUser = await user
      .findById(userId)
      .select("-password -refreshToken");

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(currentUser);
  } catch (error) {
    console.error("getAdminProfile error:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
/**
 * Update logged-in user profile
 * PUT /users/profile
 */
export const updateAdminProfile = async (req, res) => {
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
