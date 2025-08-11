import { Router } from 'express';
import { listMovies } from '../controllers/movie.controller';
import * as ratingCtrl from '../controllers/rating.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import {
  RatingInputSchema,
  RatingUpdateSchema,
  RatingParamsSchema,
  RatingParamsWithIdSchema,
} from '../validators/rating.schema';

const router = Router();

// /movies
router.get('/', listMovies);

// /movies/:movieId/ratings
router.get(
  '/:movieId/ratings',
  validate({ params: RatingParamsSchema }),
  ratingCtrl.listByMovie
);

router.get(
  '/:movieId/ratings/:ratingId',
  validate({ params: RatingParamsWithIdSchema }),
  ratingCtrl.getOne
);

router.post(
  '/:movieId/ratings',
  authMiddleware,
  validate({ params: RatingParamsSchema, body: RatingInputSchema }),
  ratingCtrl.create
);

router.patch(
  '/:movieId/ratings/:ratingId',
  authMiddleware,
  validate({ params: RatingParamsWithIdSchema, body: RatingUpdateSchema }),
  ratingCtrl.update
);

router.delete(
  '/:movieId/ratings/:ratingId',
  authMiddleware,
  validate({ params: RatingParamsWithIdSchema }),
  ratingCtrl.remove
);

export default router;