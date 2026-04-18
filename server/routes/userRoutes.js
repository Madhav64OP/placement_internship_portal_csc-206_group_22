import express from 'express';
const router = express.Router();

import { getUserProfile } from '../controllers/userController.js';

router.get('/:userId', getUserProfile);

export default router;

