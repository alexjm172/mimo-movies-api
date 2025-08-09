import { Router } from 'express';
import moviesRouter from './movie.routes';
import authRouter from './auth.routes';
import watchlistRouter from './watchlist.routes';

const router = Router();

router.use('/movies', moviesRouter);  
router.use('/', authRouter);         
router.use('/watchlist', watchlistRouter);

export default router;