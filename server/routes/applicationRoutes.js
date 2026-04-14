const express = require('express');
const router = express.Router();
const { applyToCompany, getStudentApplications } = require('../controllers/applicationController');

// POST: http://localhost:5000/api/applications/apply
router.post('/apply', applyToCompany);

// GET: http://localhost:5000/api/applications/student/:studentId
router.get('/student/:studentId', getStudentApplications);

module.exports = router;