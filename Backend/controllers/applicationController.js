const Application = require("../models/Application");


// Apply for Jobs
exports.applyForJobs = async (req, res) => {
  const { jobId, employeeId, coverLetter } = req.body;
  try {
    const newApplication = new Application({
      jobId,
      employeeId,
      coverLetter,
    });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get job applications for a specific job
exports.getJobApplications = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applications = await Application.find({ jobId }).populate(
      "employeeId"
    );

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .json({ message: "No applications found for this job." });
    }
    res.status(200).json(applications);

  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Get jobs applied by an employee
exports.getAppliedJobs = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const applications = await Application.find({ employeeId }).populate('jobId');
    const appliedJobs = applications.map(application => application.jobId);

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error fetching applied jobs", error });
  }
};