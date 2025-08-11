import { Request, Response, NextFunction } from 'express';
import * as service from '../services/watchlist.service';

// el usuario solo puede operar sobre su propio userId
function ensureSelf(req: Request, userId: number) {
  const authId = (req as any).user?.id;
  return typeof authId === 'number' && authId === userId;
}

// GET /watchlist/:userId
export async function getWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    if (!ensureSelf(req, userId)) {
      return res.status(401).json({ error: 'No autorizado' });
    }
    const items = await service.getWatchlist(userId);
    return res.status(200).json(items);
  } catch (err) { next(err); }
}

// POST /watchlist/:userId/items
export async function addToWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    if (!ensureSelf(req, userId)) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const movieId = Number(req.body.movieId);
    const item = await service.add(userId, movieId); // lanza 404 o 409 si toca

    res.setHeader('Location', `/watchlist/${userId}/items/${movieId}`); // itemId == movieId
    return res.status(201).json(item);
  } catch (err) { next(err); }
}

// DELETE /watchlist/:userId/items/:itemId   (itemId == movieId)
export async function removeFromWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = Number(req.params.userId);
    if (!ensureSelf(req, userId)) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    const movieId = Number(req.params.itemId);
    await service.removeByMovie(userId, movieId);
    return res.status(204).send(); // idempotente
  } catch (err) { next(err); }
}