const Admin = require('../models/Admin')
const bcrypt = require('bcrypt');


const Recruiter = require('../models/Recruiter');
const Employee = require('../models/Employee');
const Job = require('../models/Job');
const Application = require('../models/Application');

// Register admin
exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login admin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Set session or similar logic here

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  // Validate request
  if (!email || !oldPassword || !newPassword) {
    return res.status(400).json({ msg: 'Please provide all fields.' });
  }

  try {
    // Find the user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: 'Admin not found.' });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Old password is incorrect.' });
    }

    // Hash new password and save
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    res.status(200).json({ msg: 'Password changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error });
  }
};

// Recruiters
exports.getAllRecruiters = async (req, res) => {
  const recruiters = await Recruiter.find();
  res.json(recruiters);
};

exports.addRecruiter = async (req, res) => {
  try {
    // Extract the password and other fields from the request body
    const { password, ...otherFields } = req.body;

    // Check if password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new recruiter object with the hashed password
    const newRecruiter = new Recruiter({ ...otherFields, password: hashedPassword });

    // Save the recruiter to the database
    await newRecruiter.save();

    // Respond with the newly created recruiter object
    res.status(201).json(newRecruiter);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error adding recruiter', error: error.message });
  }
};

exports.updateRecruiter = async (req, res) => {
  try {
    // Extract password from the request body if it exists
    const { password, ...updateFields } = req.body;

    // Hash the password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    // Find and update the recruiter
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    // Check if recruiter was found and updated
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    // Respond with the updated recruiter
    res.json(recruiter);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error updating recruiter', error: error.message });
  }
};

exports.deleteRecruiter = async (req, res) => {
  await Recruiter.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recruiter deleted' });
};




// Employees
// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      institutionName,
      startYear,
      endYear,
      skills,
    } = req.body;

    // Check if employee already exists
    let employee = await Employee.findOne({ email });
    if (employee) {
      console.log("Employee already exists:", email);
      return res.status(400).json({ msg: "Employee already exists" });
    }

    // Create a new employee
    employee = new Employee({
      name,
      email,
      password,
      phone,
      institutionName,
      startYear,
      endYear,
      skills,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    employee.password = await bcrypt.hash(password, salt);

    // Save files if they exist in the request
    if (req.files) {
      if (req.files.resume) {
        const resumePath = `upload/resumes/${Date.now()}_${req.files.resume[0].originalname}`;
        fs.writeFileSync(path.join(__dirname, "..", resumePath), req.files.resume[0].buffer);
        employee.resume = resumePath;
      }
    
      if (req.files.profilePic) {
        const profilePicPath = `upload/profilePics/${Date.now()}_${req.files.profilePic[0].originalname}`;
        fs.writeFileSync(path.join(__dirname, "..", profilePicPath), req.files.profilePic[0].buffer);
        employee.profilePic = profilePicPath;
      }
    }

    // Save the employee to the database
    await employee.save();
    console.log("Employee adding successfully:", email);

    return res.json({ status: 200, user: employee });
  } catch (err) {
    console.error("adding error:", err.message);
    return res.status(500).send("Server error");
  }
};
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, institutionName, startYear, endYear, skills } = req.body;
    const profilePic = req.files?.profilePic?.[0]?.path || req.body.profilePic;
    const resume = req.files?.resume?.[0]?.path || req.body.resume;

    const updateData = { name, email, phone, institutionName, startYear, endYear, skills, profilePic, resume };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

// Delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};





// Jobs


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs' });
  }
};

exports.addJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Error adding job' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: 'Error updating job' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job' });
  }
};

//  applications
// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
const applications = await Application.find()
  .populate('jobId', 'title') // Fetches the job title from the Job model
  .populate('employeeId', 'name'); // Fetches the employee name from the Employee model
  console.log(applications); // Add this to see the result
  res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications', error });
  }
};



// Delete application
// DELETE request to delete an application by ID
exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting application', error });
  }
};


// Settings
exports.getSettings = async (req, res) => {
  const settings = await Setting.find();
  res.json(settings);
};

exports.updateSettings = async (req, res) => {
  const settings = await Setting.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(settings);
};
