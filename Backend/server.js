const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON data from requests
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));            // Enable Cross-Origin Resource Sharing

// Connect to MongoDB
connectDB();

// Static files (for file uploads and public assets)
app.use(express.static(path.join(__dirname, "/public")));
app.use("/upload", express.static("upload"));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/recruiter', require('./routes/recruiter'));
app.use('/api/employee', require('./routes/employee'));
app.use('/api/job', require('./routes/job'));
app.use('/api/application', require('./routes/application'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/subscribe', require('./routes/suscribe'));

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
