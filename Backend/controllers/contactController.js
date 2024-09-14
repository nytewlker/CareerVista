// controllers/contactController.js
const nodemailer = require('nodemailer');

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anand.dwiivedi@gmail.com',
    pass: 'Mrityunjay@09'
  }
});

// Handle Contact Form Submission
const handleContactForm = (req, res) => {
  const { name, phone, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'anand.dwiivedi@gmail.com', // The recipient's email address
    subject: 'Contact Us Form Submission',
    text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
};

module.exports = {
  handleContactForm
};
