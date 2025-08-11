import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import * as wl from '../controllers/watchlist.controller';
import {
  watchlistParamsUserSchema,
  watchlistParamsItemSchema,
  watchlistBodyAddSchema,
} from '../validators/watchlist.schema';

const router = Router();

router.use(authMiddleware);

import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlist.controller';
router.get('/:userId', validate({ params: watchlistParamsUserSchema }), getWatchlist);
router.post('/:userId/items', validate({ params: watchlistParamsUserSchema, body: watchlistBodyAddSchema }), addToWatchlist);
router.delete('/:userId/items/:itemId', validate({ params: watchlistParamsItemSchema }), removeFromWatchlist);

export default router;