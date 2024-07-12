const mongoose = require("mongoose");
const Job = require("../models/Job");
const Recruiter = require("../models/Recruiter"); // Assuming you have a Recruiter model


// Post a Job
exports.postJob = async (req, res) => {
  const {
    title,
    description,
    recruiterId,
    company,
    location,
    jobType,
    salary,
    experience,
  } = req.body;
  try {
    // Create a new job with recruiter's id and company
    const newJob = new Job({
      title,
      description,
      recruiterId,
      company,
      location,
      jobType,
      salary,
      experience,
    });
    const job = await newJob.save();
    res.status(200).json({ status: 200, job });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};


// Get all jobs with recruiter details
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiterId", "company");
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error" });
  }
};


// Get jobs by recruiterId with recruiter details
exports.getJobsByRecruiterId = async (req, res) => {
  const recruiterId = req.params.recruiterId;

  try {
    const jobs = await Job.find({ recruiterId }).populate(
      "recruiterId",
      "company"
    );
    res.status(200).json(jobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};


// Delete a job by ID
exports.handleDeleteJob = async (req, res) => {
  const jobId = req.params.id;

  try {
    // Example: Delete job using Mongoose
    const deletedJob = await Job.findByIdAndDelete(jobId);

    // If you have other actions (like notifying users, etc.), you can handle them here

    // Respond with success message
    res.status(200).json({ message: "Job deleted successfully", deletedJob });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server error" });
  }
};


// Update a job by ID
exports.updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, location, jobType, salary, experience } =
    req.body;

  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { title, description, location, jobType, salary, experience },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
};
