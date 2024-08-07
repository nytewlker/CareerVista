const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employeeController');

// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Employee Registration with file upload handling
router.post('/register',upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), employeeController.registerEmployee);

// Employee Login
router.post('/login', employeeController.loginEmployee);

// POST /api/employee/logout
router.post('/logout', employeeController.employeeLogout);

// Get Employee Profile
router.get('/profile/:id', employeeController.getEmployeeProfile);

// Update Employee Profile
// Update Employee Profile
router.put('/profile/:id',  upload.fields([{ name: 'resume' }, { name: 'profilePic' }]), employeeController.updateEmployeeProfile);

module.exports = router;
module.exports = router;
