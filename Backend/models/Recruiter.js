const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    // unique: true

  },
  password: {
    type: String,
    
  },
  company: {
    type: String,
  
  }
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
