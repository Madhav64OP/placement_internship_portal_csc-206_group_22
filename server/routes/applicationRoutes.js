import express from 'express';
const router = express.Router();
import { applyToCompany,getStudentApplications } from '../controllers/ApplicationController.js';

// POST: http://localhost:5000/api/applications/apply
router.post('/apply', applyToCompany);

// GET: http://localhost:5000/api/applications/student/:studentId
router.get('/student/:studentId', getStudentApplications);

export default router;