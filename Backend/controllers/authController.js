const crypto = require('crypto');
const bcrypt = require('bcrypt');
const Employee = require('../models/Employee');
const Recruiter = require('../models/Recruiter');

// Helper function to find a user by email and role
const findUserByEmail = async (email, role) => {
  if (role === 'employee') {
    return await Employee.findOne({ email });
  } else if (role === 'recruiter') {
    return await Recruiter.findOne({ email });
  }
};

// Forgot Password: Send reset link
exports.forgotPassword = async (req, res) => {
  try {
    const { email, role } = req.body;

    // Ensure email and role are provided
    if (!email || !role) {
      return res.status(400).json({ msg: 'Email and role are required' });
    }

    const user = await findUserByEmail(email, role);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry

    await user.save();

    // In production, send the reset link via email.
    // For now, we'll return the token in the response for testing purposes.
    res.json({ msg: 'Password reset link sent', token });

    // Here you can integrate with Nodemailer or any email service to send the token as an email.
    // Example:
    // const resetLink = `http://your-app.com/reset-password/${role}/${token}`;
    // sendEmail(email, 'Password Reset Request', `Please use this link to reset your password: ${resetLink}`);

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Reset Password: Handle token and new password
exports.resetPassword = async (req, res) => {
  try {
    const { token, role } = req.params;
    const { password } = req.body;

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ msg: 'Password is required' });
    }

    let user;
    if (role === 'employee') {
      user = await Employee.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
    } else if (role === 'recruiter') {
      user = await Recruiter.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Token is invalid or expired' });
    }

    // Hash the new password and save
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ msg: 'Password has been reset' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
