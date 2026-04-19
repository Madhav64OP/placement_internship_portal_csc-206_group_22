import express from 'express';
const router = express.Router();

import { getUserProfile, updateResume } from '../controllers/userController.js';

router.get('/:userId', getUserProfile);
router.patch('/:userId/resume',updateResume);

export default router;

