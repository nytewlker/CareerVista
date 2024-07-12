const mongoose = require("mongoose");


const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  institutionName: { type: String },
  startYear: { type: String },
  endYear: { type: String },
  skills: [{ type: String }], // Consider using array if multiple skills
  resume: { type: String }, // Store file path or URL
  profilePic: { type: String }, // Store file path or URL
});


module.exports = mongoose.model("Employee", employeeSchema);
