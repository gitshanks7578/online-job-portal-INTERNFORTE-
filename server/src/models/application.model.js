import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",  
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true
    },
    // resume: {
    //   type: String, 
    // },
    status: {
      type: String,
      // enum: ["applied", "shortlisted", "rejected", "hired"],
      // default: "applied"
      enum:["accepted","rejected","pending"],
      default:"pending",
    }
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", applicationSchema);
