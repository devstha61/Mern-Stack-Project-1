import { Router } from 'express';
import { register, login, getAllUsers } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authMiddleware, getAllUsers); // Protect this route with authMiddleware

export default router;
