import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
router.post('/sessions', login);               // POST /sessions
router.get('/me', authMiddleware, (req, res) => res.json({ user: (req as any).user })); // GET /me
export default router;
