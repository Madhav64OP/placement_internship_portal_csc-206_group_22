const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// POST request to trigger the clash detection and schedule the interview
router.post('/schedule', interviewController.scheduleInterview);

module.exports = router;