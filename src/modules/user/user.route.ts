import express from 'express';
import { login, register, getCurrentUser } from './user.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = express.Router();

// =====================
// LOGIN
// =====================
router.post('/login', login);

// =====================
// REGISTER
// =====================
router.post('/register', register);

// =====================
// GET CURRENT USER (Protected)
// =====================
router.get('/me', authMiddleware, getCurrentUser);

export const UserRoutes = router;
