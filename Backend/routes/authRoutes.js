// authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);

// Reset password route (using the token and role)
router.post('/reset-password/:role/:token', authController.resetPassword);

module.exports = router;
