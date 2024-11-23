const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  institutionName: { type: String },
  startYear: { type: String },
  endYear: { type: String },
  skills: [{ type: String }], // Array of skills
  resume: { type: String }, // Store file path or URL of resume
  profilePic: { type: String }, // Store file path or URL of profile picture
  resetPasswordToken: { type: String }, // Token for password reset
  resetPasswordExpires: { type: Date }, // Expiration for reset token
});

module.exports = mongoose.model('Employee', employeeSchema);
