
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
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
app.use('/api/admin', require('./routes/admin'));
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/job/', require('./routes/job'));
app.use('/api/application', require('./routes/application'));
app.use('/api/contact',require('./routes/contact'));
app.use('/api/subscribe',require('./routes/suscribe'))

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
