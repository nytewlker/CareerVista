const express = require('express');
const multer = require('multer');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');


// Set up multer for file handling (not used in this case, but kept for consistency)
const upload = multer();

// Recruiter Registration
router.post('/register', upload.none(), recruiterController.registerRecruiter);

// Recruiter Login
router.post('/login', recruiterController.loginRecruiter);

// Logout Route
router.post('/logout', recruiterController.recruiterLogout);

// Get Recruiter Profile
router.get('/profile/:id', recruiterController.getRecruiterProfile);

// Update Recruiter Profile
router.put('/profile/:id', upload.none(), recruiterController.updateRecruiterProfile);

module.exports = router;
