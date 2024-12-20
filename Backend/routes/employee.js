const express = require('express');
const router = express.Router();
const multer = require('multer');
const employeeController = require('../controllers/employeeController');

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/register',
  upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]),
  employeeController.registerEmployee
);

router.post('/login', employeeController.loginEmployee);
router.post('/logout', employeeController.employeeLogout);
router.get('/profile/:id', employeeController.getEmployeeProfile);
router.put(
  '/profile/:id',
  upload.fields([{ name: 'resume' }, { name: 'profilePic' }]),
  employeeController.updateEmployeeProfile
);

module.exports = router;
