import { Router } from 'express';
import { listMovies } from '../controllers/movie.controller';
import * as ratingCtrl from '../controllers/rating.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { RatingInputSchema } from '../validators/rating.schema';

const router = Router();

// /movies
router.get('/', listMovies);

// /movies/:movieId/ratings
router.get('/:movieId/ratings', ratingCtrl.listByMovie);
router.get('/:movieId/ratings/:ratingId', ratingCtrl.getOne);
router.post('/:movieId/ratings', authMiddleware, validateBody(RatingInputSchema), ratingCtrl.create);
router.patch('/:movieId/ratings/:ratingId', authMiddleware, validateBody(RatingInputSchema), ratingCtrl.update);
router.delete('/:movieId/ratings/:ratingId', authMiddleware, ratingCtrl.remove);

export default router;
