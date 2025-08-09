import { Router } from 'express';
import moviesRouter from './moview.routes';

const router = Router();
router.use('/movies', moviesRouter);

export default router;