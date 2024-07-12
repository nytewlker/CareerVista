const mongoose = require("mongoose");


const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  coverLetter: {
    type: String,
  },
});


module.exports = mongoose.model("Application", applicationSchema);
