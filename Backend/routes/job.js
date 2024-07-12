const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController'); // Import the jobController

// Post a Job
router.post('/', jobController.postJob);

// Route to get all jobs
router.get('/', jobController.getAllJobs);

// Get jobs by recruiterId
router.get('/:recruiterId', jobController.getJobsByRecruiterId);

// Delete a job by ID
router.delete('/:id', jobController.handleDeleteJob);

// Update a job by ID
router.put('/:id', jobController.updateJob);

module.exports = router;
