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
    // Find all applications by the employeeId, populate the jobId details
    const applications = await Application.find({ employeeId }).populate('jobId');

    // Filter out any applications with null or missing jobId references
    const validApplications = applications.filter(application => application.jobId);

    // Map applied jobs with jobId details, status, and message
    const appliedJobs = validApplications.map(application => ({
      _id: application.jobId._id,
      title: application.jobId.title,
      description: application.jobId.description,
      company: application.jobId.company,
      location: application.jobId.location,
      jobType: application.jobId.jobType,
      salary: application.jobId.salary,
      status: application.status,
      message: application.message
    }));

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Error fetching applied jobs", error: error.message });
  }
};



// Accept application
exports.acceptApplication = async (req, res) => {
  const { applicationId } = req.params;
  const { message } = req.body; // Assuming message is passed from the frontend
  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    application.status = "accepted";
    application.message = message;
    await application.save();
    res.status(200).json({ message: "Application accepted successfully." });
  } catch (error) {
    console.error("Error accepting application:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Reject application
exports.rejectApplication = async (req, res) => {
  const { applicationId } = req.params; // Extract applicationId from URL parameters
  try {
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found." });
    }
    application.status = "rejected";
    await application.save();
    res.status(200).json({ message: "Application rejected successfully." });
  } catch (error) {
    console.error("Error rejecting application:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
