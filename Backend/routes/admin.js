const express = require('express');
const { registerAdmin, loginAdmin, logoutAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
// router.post('/logout', logoutAdmin);

module.exports = router;