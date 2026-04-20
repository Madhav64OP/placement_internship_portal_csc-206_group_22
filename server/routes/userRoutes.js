import express from 'express';
const router = express.Router();

import { getAllStudents, getUserProfile, loginUser, updateResume } from '../controllers/userController.js';

router.post('/login', loginUser);
router.get('/', getAllStudents);
router.get('/:userId', getUserProfile);
router.patch('/:userId/resume',updateResume);

export default router;

