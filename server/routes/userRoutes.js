import express from 'express';
const router = express.Router();

import { getUserProfile } from '../controllers/userController';

router.get('/:userId', getUserProfile);

module.exports = router;

