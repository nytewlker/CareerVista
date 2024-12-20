const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const Employee = require('../models/Employee');

// Utility function to save files
const saveFile = (folder, file) => {
  const filePath = `upload/${folder}/${Date.now()}_${file.originalname}`;
  const fullPath = path.join(__dirname, '..', filePath);
  fs.writeFileSync(fullPath, file.buffer);
  return filePath;
};

// Register a new employee
exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, password, phone, institutionName, startYear, endYear, skills } = req.body;

    // Check if employee already exists
    let employee = await Employee.findOne({ email });
    if (employee) {
      return res.status(400).json({ msg: 'Employee already exists' });
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

    // Handle uploaded files
    if (req.files) {
      if (req.files.resume) {
        employee.resume = saveFile('resumes', req.files.resume[0]);
      }
      if (req.files.profilePic) {
        employee.profilePic = saveFile('profilePics', req.files.profilePic[0]);
      }
    }

    // Save the employee to the database
    await employee.save();

    return res.status(200).json({ user: employee });
  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).send('Server error');
  }
};



// Log in an employee
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Logging in employee:", email);

    // Find the employee by email
    let employee = await Employee.findOne({ email });
    if (!employee) {
      console.log("Employee not found:", email);
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      console.log("Invalid password for employee:", email);
      return res.status(400).json({ msg: "Invalid Credentials" });
    }



    console.log("Employee logged in successfully:", email);

    return res.status(200).json({ status: 200, user: employee });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).send("Server error");
  }
};


// Get Employee Profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// update employee
exports.updateEmployeeProfile = async (req, res) => {
  const { name, email, phone, institutionName, startYear, endYear, skills } = req.body;

  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.institutionName = institutionName || employee.institutionName;
    employee.startYear = startYear || employee.startYear;
    employee.endYear = endYear || employee.endYear;
    employee.skills = skills || employee.skills;

    if (req.files) {
      if (req.files.resume) {
        const resumePath = `upload/resumes/${Date.now()}_${req.files.resume[0].originalname}`;
        fs.writeFileSync(path.join(__dirname, '..', resumePath), req.files.resume[0].buffer);
        employee.resume = resumePath;
      }
      if (req.files.profilePic) {
        const profilePicPath = `upload/profilePics/${Date.now()}_${req.files.profilePic[0].originalname}`;
        fs.writeFileSync(path.join(__dirname, '..', profilePicPath), req.files.profilePic[0].buffer);
        employee.profilePic = profilePicPath;
      }
    }

    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

//employee/logout
exports.employeeLogout = async (req, res) => {
  try {

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // Clear session cookie
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
  }
};