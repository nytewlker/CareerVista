const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// Apply for a job
router.post("/apply", applicationController.applyForJobs);

// Get applications for a specific job
router.get("/applications/:jobId", applicationController.getJobApplications);

// Get jobs applied by an employee
router.get('/applied/:employeeId', applicationController.getAppliedJobs);


// Accept application
router.post('/accept', applicationController.acceptApplication);

// Reject application
router.post('/reject', applicationController.rejectApplication);




module.exports = router;
