const express = require('express');
const router = express.Router();
const {
  getAllRecruiters, addRecruiter, updateRecruiter, deleteRecruiter,
  getAllEmployees, addEmployee, updateEmployee, deleteEmployee,
  getAllJobs, addJob, updateJob, deleteJob,
  getAllApplications, updateApplicationStatus,
  getSettings, updateSettings
} = require('../controllers/adminController');

// Recruiters
router.get('/recruiters', getAllRecruiters);
router.post('/recruiters', addRecruiter);
router.put('/recruiters/:id', updateRecruiter);
router.delete('/recruiters/:id', deleteRecruiter);

// Employees
router.get('/employees', getAllEmployees);
router.post('/employees', addEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Jobs
router.get('/jobs', getAllJobs);
router.post('/jobs', addJob);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// Applications
router.get('/applications', getAllApplications);
router.put('/applications/:id', updateApplicationStatus);

// Settings
router.get('/settings', getSettings);
router.put('/settings', updateSettings);

module.exports = router;
