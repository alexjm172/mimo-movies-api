import { Request, Response, NextFunction } from 'express';
import * as wlService from '../services/watchlist.service';

function parseId(v: string | undefined) { const n = Number(v); return Number.isFinite(n) ? n : NaN; }
function ensureSelf(req: Request, userId: number) {
  const user = (req as any).user as { id: number } | undefined;
  return user && user.id === userId;
}

// GET /watchlist/:userId
export async function getUserWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseId(req.params.userId);
    if (Number.isNaN(userId)) return res.status(422).json({ error: 'ID de usuario inválido' });
    if (!ensureSelf(req, userId)) return res.status(401).json({ error: 'No autorizado' });
    const items = await wlService.getUserWatchlist(userId);
    return res.status(200).json(items);
  } catch (err) { next(err); }
}

// POST /watchlist/:userId/items
export async function addToWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseId(req.params.userId);
    if (Number.isNaN(userId)) return res.status(422).json({ error: 'ID de usuario inválido' });
    if (!ensureSelf(req, userId)) return res.status(401).json({ error: 'No autorizado' });

    const { movieId, watched = false } = req.body ?? {};
    const item = await wlService.addToWatchlist(userId, Number(movieId), Boolean(watched));
    return res.status(201).json(item);
  } catch (err) { next(err); }
}

// DELETE /watchlist/:userId/items/:itemId  (itemId = movieId)
export async function removeFromWatchlist(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = parseId(req.params.userId);
    const itemId = parseId(req.params.itemId);
    if (Number.isNaN(userId) || Number.isNaN(itemId)) return res.status(422).json({ error: 'IDs inválidos' });
    if (!ensureSelf(req, userId)) return res.status(401).json({ error: 'No autorizado' });

    await wlService.removeFromWatchlist(userId, itemId);
    return res.status(204).send();
  } catch (err) { next(err); }
}
