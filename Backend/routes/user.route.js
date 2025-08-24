import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { deleteUser } from '../controllers/auth.controller.js';

const router = Router();

router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
