// routes/contactRoutes.js
const express = require('express');
const { handleContactForm } = require('../controllers/contactController');

const router = express.Router();

// Define route for contact form submission
router.post('/contact', handleContactForm);

module.exports = router;
