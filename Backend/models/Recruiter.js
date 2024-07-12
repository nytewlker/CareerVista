const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  companyName: { type: String },
  bio: { type: String },
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
