import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validate.middleware';
import { WatchlistItemInputSchema } from '../validators/watchlist.schema';
import * as ctrl from '../controllers/watchlist.controller';

const router = Router();
router.get('/:userId', authMiddleware, ctrl.getUserWatchlist);
router.post('/:userId/items', authMiddleware, validateBody(WatchlistItemInputSchema), ctrl.addToWatchlist);
router.delete('/:userId/items/:itemId', authMiddleware, ctrl.removeFromWatchlist);
export default router;
