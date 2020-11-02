import express from 'express';
const router = express.Router();
import { authenticateUser } from '../controllers/userController.js';

router.route('/login').post(authenticateUser);

export default router;
