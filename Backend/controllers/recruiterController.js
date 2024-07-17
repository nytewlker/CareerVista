const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/Recruiter");


// Register a new recruiter
exports.registerRecruiter = async (req, res) => {
  const { name, email, password, phone, companyName, bio } = req.body;

  try {
    console.log("Registering recruiter:", email);

    // Check if recruiter already exists
    let recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      console.log("Recruiter already exists:", email);
      return res.status(400).json({ msg: "Recruiter already exists" });
    }

    // Create a new recruiter
    recruiter = new Recruiter({
      name,
      email,
      password,
      phone,
      companyName,
      bio,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    recruiter.password = await bcrypt.hash(password, salt);

    // Save the recruiter to the database
    await recruiter.save();

    // // Create a JWT token for the new recruiter
    // const payload = { recruiter: { id: recruiter.id } };
    // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

    console.log("Recruiter registered successfully:", email);

    return res.status(200).json({ status: 200, user: recruiter });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).send("Server error");
  } finally {
    console.log("Registration process completed.");
  }
};


// Log in a recruiter
exports.loginRecruiter = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Logging in recruiter:", email);

    // Find the recruiter by email
    let recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      console.log("Recruiter not found:", email);
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      console.log("Invalid password for recruiter:", email);
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    console.log("Recruiter logged in successfully:", email);
    return res.status(200).json({ status: 200, user: recruiter });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).send("Server error");
  } finally {
    console.log("Login process completed.");
  }
};

// Get Recruiter Profile
exports.getRecruiterProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id).select('-password');
    if (!recruiter) {
      return res.status(404).json({ msg: 'Recruiter not found' });
    }
    res.json(recruiter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateRecruiterProfile = async (req, res) => {
  const { name, email, password, phone, companyName, bio } = req.body;
  try {
    const recruiterId = req.params.id;

    // Check if the email is already used by another recruiter
    const existingRecruiter = await Recruiter.findOne({ email, _id: { $ne: recruiterId } });
    if (existingRecruiter) {
      return res.status(400).json({ msg: 'Email is already in use' });
    }

    let recruiter = await Recruiter.findById(recruiterId);

    if (!recruiter) {
      return res.status(404).json({ msg: 'Recruiter not found' });
    }

    const fieldsToUpdate = { name, email, phone, companyName, bio };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      fieldsToUpdate.password = await bcrypt.hash(password, salt);
    }

    recruiter = await Recruiter.findByIdAndUpdate(
      recruiterId,
      { $set: fieldsToUpdate },
      { new: true }
    ).select('-password');

    res.json(recruiter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Logout Controller for Recruiter
exports.recruiterLogout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};

