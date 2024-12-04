const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, './config/config.env') });

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://careervista.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Specify allowed methods
  credentials: true // If needed, allow credentials (e.g., cookies, authorization headers)
}));

// Connect to MongoDB
connectDB();

// Static files
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

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});