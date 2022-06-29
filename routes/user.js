import express from 'express';
import { getUser, findUserByUsername } from '../controllers/User.js';

const router = express.Router();


router.post('/getUser',findUserByUsername)
router.get('/:id', getUser);

export default router;