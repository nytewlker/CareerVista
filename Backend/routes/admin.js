const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  changePassword,
  logoutAdmin,

  getAllRecruiters,
  addRecruiter,
  updateRecruiter,
  deleteRecruiter,

  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,


  
  getAllJobs,
  addJob,
  updateJob,
  deleteJob,


  getAllApplications,
  deleteApplication,
} = require("../controllers/adminController");


const {  downloadJobPostingReport, downloadApplicationReport, downloadRecruiterReport, downloadEmployeeReport } = require('../controllers/reportController');




const router = express.Router();

const multer = require('multer');



// Set up multer for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post('/change-password', changePassword);

// Employee routes
router.get('/employees', getAllEmployees);
router.post('/employees', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), addEmployee);
router.put('/employees/:id', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePic', maxCount: 1 }]), updateEmployee);
router.delete('/employees/:id', deleteEmployee);

// Recruiter routes
router.get('/recruiters', getAllRecruiters);
router.post('/recruiters', addRecruiter);
router.put('/recruiters/:id', updateRecruiter);
router.delete('/recruiters/:id', deleteRecruiter);

//jobs 
router.get('/', getAllJobs);
router.post('/', addJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

//application
// GET: Retrieve all applications
router.get('/applications', getAllApplications);

// PUT: Update application status
router.delete('/applications/:applicationId', deleteApplication);


// // Report routes
router.get('/reports/download-job-posting', downloadJobPostingReport);
router.get('/reports/download-application', downloadApplicationReport);
router.get('/reports/download-recruiter', downloadRecruiterReport);
router.get('/reports/download-employee', downloadEmployeeReport);



module.exports = router;
