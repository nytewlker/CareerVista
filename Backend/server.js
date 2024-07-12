// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "config/config.env") }); // Load environment variables from .env file
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // MongoDB connection
// const MONGODB_URL = process.env.MONGODB_URL;

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//   });

// // Define Routes
// app.use("/api/recruiter", require("./routes/recruiter"));
// app.use("/api/employee", require("./routes/employee"));
// app.use("/api/job", require("./routes/job"));
// app.use('/api/application', require('./routes/application'));


// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const config = require('config');
require('dotenv').config();





// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });


const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.static(__dirname + "/public"));
app.use("/upload", express.static("upload"))

// Define Routes
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/job/', require('./routes/job'));
app.use('/api/application', require('./routes/application'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
