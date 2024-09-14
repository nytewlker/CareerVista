const express = require('express');
const router = express.Router();
const subscribeController = require('../controllers/subscribeController');

router.post('/subscribe', subscribeController.handleSubscribe);

module.exports = router;
