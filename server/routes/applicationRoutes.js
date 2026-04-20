import express from 'express';
const router = express.Router();
import { applyToCompany,getStudentApplications } from '../controllers/ApplicationController.js';

router.post('/apply', applyToCompany);

router.get('/student/:studentId', getStudentApplications);

export default router;